Title: How to Write Better Prompts: 7 Techniques That Actually Work
Date: 2026-11-09
Category: Tutorial
Tags: GenAI, LLM, prompt-engineering, tutorial, best-practices
Slug: better-prompts-7-techniques

## Why Prompts Matter

Most disappointing LLM outputs are not a model problem. They're a prompt problem. When I started building with LLMs, I treated prompts like search queries: short, vague, and hopeful. The results were inconsistent, and I blamed the model.

Then I started treating prompts like a brief for a smart new teammate who has zero context about my project. Everything changed. Here are the seven techniques I now use almost every day.

## 1. Be Specific About the Task

Vague prompts get vague answers. Say exactly what you want, why you want it, and what "good" looks like.

**Weak:** "Explain embeddings."

**Better:** "Explain text embeddings to a backend developer who has never worked with ML. Use one analogy and one short Python example. Keep it under 300 words."

The second prompt defines the audience, the format, and the length. The model no longer has to guess.

## 2. Give the Model Context

An LLM only knows what's in the conversation. If your question depends on your project, your data, or your constraints, include them.

Instead of "Why is my API slow?", try: "I have a FastAPI app that queries Postgres. The `/orders` endpoint takes 4 seconds with 50k rows. Here is the query and the table schema. What are the most likely causes?"

More relevant context almost always beats a cleverer phrasing.

## 3. Assign a Role or Perspective

Setting a role changes the tone, depth, and priorities of the answer.

- "You are a senior code reviewer. Focus on bugs and security issues, not style."
- "You are a technical editor. Tighten this paragraph without changing its meaning."

Roles are not magic, but they're a quick way to steer the model toward the kind of response you need.

## 4. Show Examples (Few-Shot Prompting)

When the output has a specific shape, showing is better than telling. Give two or three examples of the input and the output you want.

```
Convert the feedback into a sentiment label.

Feedback: "Setup was a breeze, love it."
Label: positive

Feedback: "Crashes every time I upload a file."
Label: negative

Feedback: "It works, I guess."
Label:
```

Examples lock in the format, tone, and edge-case handling far more reliably than a paragraph of instructions.

## 5. Specify the Output Format

If your code is going to consume the response, say so. Ask for JSON, a table, bullet points, or a fixed template.

"Return only valid JSON with the keys `title`, `summary`, and `tags`. No preamble, no markdown fences."

Being explicit about format saves you from writing brittle parsing code later. It also helps to tell the model what *not* to include.

## 6. Break Complex Tasks into Steps

Asking for everything in one giant prompt often leads to shallow results. Two approaches help:

- **Ask for step-by-step reasoning.** For logic, math, or debugging, tell the model to think through the problem before giving the final answer.
- **Chain prompts.** Split the work: first extract the key facts, then outline, then draft, then polish. Each step gets the model's full attention, and you can inspect the output between steps.

This is the same idea behind most AI agent workflows: small, focused steps beat one heroic prompt.

## 7. Use Structure and Delimiters

When a prompt mixes instructions, documents, and examples, the model can get confused about which is which. Separate them clearly with tags or headings.

```
<instructions>
Summarize the article in three bullet points.
</instructions>

<article>
...paste text here...
</article>
```

Clear boundaries also reduce the risk of the model treating pasted content as instructions, which matters a lot in RAG pipelines.

## Bonus: Iterate Like a Developer

Your first prompt is a draft. Treat prompt writing like debugging:

1. Run the prompt on a handful of real inputs.
2. Note where it fails.
3. Change one thing at a time.
4. Save the version that works.

If a prompt matters to your app, keep a small set of test cases and re-run them whenever you tweak it or switch models.

## Quick Checklist

Before you hit enter, ask yourself:

- Did I state the task clearly?
- Did I include the context the model can't know?
- Did I define the audience and the output format?
- Would an example help?
- Should this be split into smaller steps?

## Final Thoughts

Good prompting isn't about secret phrases or tricks. It's about clear communication: say what you want, give the needed context, show what good looks like, and iterate. These seven techniques have saved me hours, and they'll work across almost any model you use.

In the next post, I'll go deeper into few-shot prompting and show how to build a small evaluation set to test your prompts.