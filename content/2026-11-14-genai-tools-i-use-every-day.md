Title: GenAI Tools I Actually Use Every Day
Date: 2026-11-14
Category: Tools
Tags: GenAI, LLM, tools, productivity, developer-workflow, AI-coding
Slug: genai-tools-i-use-every-day

## Tools vs Hype

Every week there's a new "must-try" AI tool. I've tried a lot of them, and most of them lasted about three days in my workflow.

This post isn't a "top 50 AI tools" list. It's the short list of things I open daily, what I use each one for, and where each one lets me down. If a tool isn't on this list, it's not because it's bad. It just didn't stick.

## How I Decide What Stays

Before a tool earns a permanent spot, it has to pass a few simple tests:

- **Does it save me real time?** Not "feels cool" time, but actual hours.
- **Does it fit into how I already work?** If I have to change my whole routine, it usually gets dropped.
- **Can I verify its output easily?** Tools whose mistakes are hard to spot are risky.
- **Is it reliable enough?** One great answer and nine flaky ones is not a tool, it's a gamble.
- **Does it respect my data?** I'm careful about what I paste into third-party services.

## 1. A General-Purpose Chat Assistant

**What I use it for:** My daily thinking partner. I use it to explain unfamiliar concepts, debug confusing errors, brainstorm approaches, draft documentation, and review my own writing.

**How I get the most out of it:**

- I give plenty of context: the stack, the goal, the error, and what I've already tried.
- I ask it to explain its reasoning, not just give an answer.
- I use it to compare options and list trade-offs before I decide.

**Where it falls short:** It can be confidently wrong, especially on niche libraries and recent changes. I always check important details against official docs.

## 2. An AI Coding Assistant in My Editor

**What I use it for:** Autocomplete, boilerplate, writing tests, small refactors, and explaining code I didn't write. It's great for the repetitive 30% of coding.

**My rules for using it:**

- I read every suggestion before accepting it.
- I keep changes small so they're easy to review.
- I run tests after anything it generates.
- I don't accept code I can't explain.

**Where it falls short:** It doesn't always understand the bigger architecture. It may suggest a quick fix that works today and creates a mess next month.

## 3. An Agentic Coding Tool for Bigger Tasks

**What I use it for:** Multi-file changes, scaffolding a new feature, migrating code, and exploring a codebase. Instead of one suggestion at a time, I describe a task and review the result as a set of changes.

**What works well:**

- Writing a clear task description with acceptance criteria.
- Letting it plan first and checking the plan before it edits anything.
- Reviewing the diff like I'd review a teammate's pull request.
- Working on a separate branch so I can discard it easily.

**Where it falls short:** Vague tasks produce wandering results, and it can make broad changes I didn't ask for. Tight scope and careful review matter a lot here.

## 4. Local Models

**What I use them for:** Experimenting with open-source models like LLaMA and Mistral on my own machine, testing prompts without API costs, and working with data I'd rather not send out.

**Why I like them:**

- They teach me how models behave under the hood, including quantization, context limits, and speed trade-offs.
- They're free to experiment with once set up.
- They give me a private option for sensitive material.

**Where they fall short:** Smaller local models are usually less capable than the best hosted ones, and they need decent hardware. I choose them for learning, privacy, and cost, not for top quality.

## 5. A Notebook-Style Research Assistant

**What I use it for:** When I have a pile of PDFs, papers, or documentation, I load them in and ask questions grounded in those sources. It's faster than skimming 40 pages to find one detail.

**My habit:** I always click through to the cited passage. If it can't point to the source, I don't trust the answer.

## 6. A Vector Database and Embeddings for My Own Projects

**What I use them for:** Not a daily "app," but a daily building block. Most of my side projects involve RAG: chunking documents, creating embeddings, storing them, and retrieving relevant context for the model.

**Lessons I keep relearning:**

- Retrieval quality matters more than prompt cleverness.
- Chunking and metadata deserve real attention.
- Always print the retrieved chunks and look at them.

## 7. An LLM API with a Small Test Harness

**What I use it for:** Whenever I build something, I call a model through an API and keep a tiny script that runs my prompts against a set of test cases. It's not glamorous, but it's the most valuable "tool" on this list.

**Why it matters:**

- It stops me from judging prompts by vibes.
- I can compare models and prompt versions side by side.
- It catches regressions when I change something.

## 8. A Writing and Editing Helper

**What I use it for:** Turning rough notes into a first draft, tightening paragraphs, suggesting headings, and checking clarity. Yes, this includes blog posts like this one.

**How I keep it honest:**

- The ideas and experiences come from me. The tool helps with structure and polish.
- I rewrite anything that doesn't sound like me.
- I check every fact, number, and claim.

## 9. Voice and Transcription Tools

**What I use them for:** Capturing quick ideas, transcribing meetings or videos, and turning messy spoken thoughts into organized notes. It's a small time saver that adds up.

**Where they fall short:** Technical terms and names are often misheard, so I scan the transcript before relying on it.

## What I Stopped Using

Being honest, a lot of tools didn't survive:

- **Tools that duplicate what I already have.** Five chat assistants are not better than one or two.
- **Flashy demos with no real workflow.** Impressive once, useless on day three.
- **Anything that makes me paste sensitive data casually.** Convenience isn't worth the risk.
- **Tools that hide how they work.** If I can't tell why it gave an answer, I struggle to trust it.

## My Daily Workflow in Practice

A typical day looks something like this:

1. **Morning:** Plan the day and think through a tricky problem with a chat assistant.
2. **Coding:** Editor assistant for small suggestions, an agentic tool for larger scoped tasks.
3. **Learning:** Load a paper or docs into a research assistant and ask targeted questions.
4. **Building:** Test prompts and retrieval with my small evaluation script.
5. **Evening:** Draft and polish writing, capture notes, and review what worked and what didn't.

## Tips If You're Building Your Own Stack

- Start with one or two tools and learn them deeply.
- Add a new tool only when you can name the problem it solves.
- Keep notes on what works so you can improve your prompts over time.
- Always keep a verification habit: read, run, and check sources.
- Review your tools every few months. This space changes quickly, and what's best today may not be next year.

## Quick Checklist

Before adding a tool to your daily routine, ask yourself:

- What specific problem does it solve for me?
- Is it better than what I already use?
- Can I easily check its output?
- Is it safe to use with the data I work with?
- What does it cost, in money and in attention?

## Final Thoughts

The best GenAI tool isn't the newest or the most hyped. It's the one that quietly makes your work better, and that you understand well enough to know when not to trust it.

My stack will keep changing, and that's fine. What stays constant is the approach: use tools to speed up the boring parts, stay in charge of the thinking, and verify what matters.

In the next post, I'll share my setup for running local models and when it's actually worth it over using a hosted API.