Title: Build a Chatbot with Memory Using Just a Few Dozen Lines of Python
Date: 2026-11-27
Category: Tutorial
Tags: GenAI, LLM, Python, chatbot, memory, tutorial, beginner
Slug: chatbot-with-memory-in-python

## The Chatbot That Forgot My Name

The first chatbot I ever built had a funny problem. I told it my name, asked a follow-up question, and it replied, "Sorry, I don't know your name." I had done nothing wrong. I just didn't understand how LLM APIs work.

The fix turned out to be surprisingly small. In this post, I'll show you how to build a chatbot that remembers the conversation, survives restarts, and doesn't blow up when the chat gets long. The final script is a few dozen lines of Python.

## Why Chatbots "Forget"

LLM APIs are **stateless**. Every request is independent, and the model only knows what you send in that request. The "memory" you see in chat apps is just the app sending the earlier messages again each time.

So building memory means answering three questions:

1. **What do I send?** The previous messages, along with the new one.
2. **Where do I keep it?** In a list, and ideally on disk so it survives restarts.
3. **What happens when it gets too long?** Context windows are limited and tokens cost money, so old messages need to be trimmed or summarized.

We'll tackle them one at a time.

## Setup

You need Python 3.9+ and an API key. I'll use the Anthropic Python SDK, but the same ideas work with any LLM API.

```bash
pip install anthropic
export ANTHROPIC_API_KEY="your-key-here"
```

On Windows, set the environment variable with `setx ANTHROPIC_API_KEY "your-key-here"` and reopen your terminal.

## Step 1: The Chatbot Without Memory

Here's the version that forgets everything:

```python
import anthropic

client = anthropic.Anthropic()

def ask(text):
    reply = client.messages.create(
        model="claude-sonnet-5-5",
        max_tokens=1000,
        messages=[{"role": "user", "content": text}],
    )
    return reply.content[0].text

print(ask("Hi, my name is Priya."))
print(ask("What's my name?"))   # It won't know
```

Each call sends only one message, so the second call has no idea the first one happened.

## Step 2: Add Memory with a List

The fix is to keep a list of messages and send the whole list every time:

```python
history = []

def chat(text):
    history.append({"role": "user", "content": text})
    reply = client.messages.create(
        model="claude-sonnet-5-5",
        max_tokens=1000,
        messages=history,
    )
    answer = reply.content[0].text
    history.append({"role": "assistant", "content": answer})
    return answer

print(chat("Hi, my name is Priya."))
print(chat("What's my name?"))   # "Your name is Priya."
```

That's the entire trick. The model isn't remembering anything. We're re-reading it the conversation on every turn. Messages must alternate between `user` and `assistant`, which is why we append both sides.

## Step 3: Save Memory to Disk

A Python list disappears when the program exits. Saving it to a JSON file takes a few lines:

```python
import json
from pathlib import Path

MEMORY_FILE = Path("memory.json")

def load():
    if MEMORY_FILE.exists():
        return json.loads(MEMORY_FILE.read_text())
    return []

def save(history):
    MEMORY_FILE.write_text(json.dumps(history, indent=2))
```

Load the history at startup and call `save(history)` after every reply. Now the bot remembers you across restarts.

## Step 4: Handle Long Conversations

A growing history causes two problems: cost goes up with every message, and eventually you hit the context limit. There are two common fixes.

**Option A: A sliding window.** Keep only the last N messages. It's simple, but older details vanish completely.

**Option B: Summary memory.** Keep the last few messages word for word, and compress everything older into a short summary that's added to the system prompt. The bot keeps the important facts (your name, goals, preferences) without carrying every message.

I prefer Option B, so that's what the full script below does.

## The Full Script

```python
import json
from pathlib import Path
import anthropic

client = anthropic.Anthropic()        # reads ANTHROPIC_API_KEY from the environment
MODEL = "claude-sonnet-5-5"
MEMORY_FILE = Path("memory.json")
KEEP_LAST = 10                        # recent messages kept word for word (keep this even)
BASE_SYSTEM = "You are a friendly, concise assistant."

def load():
    if MEMORY_FILE.exists():
        return json.loads(MEMORY_FILE.read_text())
    return {"summary": "", "messages": []}

def save(state):
    MEMORY_FILE.write_text(json.dumps(state, indent=2))

def ask(system, messages, max_tokens=1000):
    reply = client.messages.create(
        model=MODEL, max_tokens=max_tokens, system=system, messages=messages
    )
    return reply.content[0].text

def summarize(old_summary, old_messages):
    transcript = "\n".join(f"{m['role']}: {m['content']}" for m in old_messages)
    prompt = (
        f"Current summary:\n{old_summary or '(empty)'}\n\n"
        f"New messages:\n{transcript}\n\n"
        "Update the summary. Keep names, preferences, goals and decisions. "
        "Maximum 150 words."
    )
    return ask("You write short, factual conversation summaries.",
               [{"role": "user", "content": prompt}], max_tokens=300)

def chat(state, user_text):
    state["messages"].append({"role": "user", "content": user_text})

    system = BASE_SYSTEM
    if state["summary"]:
        system += "\n\nWhat you remember from earlier:\n" + state["summary"]

    answer = ask(system, state["messages"])
    state["messages"].append({"role": "assistant", "content": answer})

    # Compress