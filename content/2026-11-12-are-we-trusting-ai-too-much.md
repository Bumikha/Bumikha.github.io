Title: Are We Trusting AI Too Much?
Date: 2026-11-12
Category: Opinion
Tags: GenAI, LLM, AI-safety, trust, critical-thinking, opinion
Slug: are-we-trusting-ai-too-much

## A Small Moment That Made Me Pause

A few weeks ago, I pasted a block of AI-generated code into a project, ran it, saw it work, and moved on. It was only the next day that I realized I had no idea what one of the functions actually did. It worked on my test input, and that was enough for me to trust it.

That small moment bothered me. I'm someone who writes about AI skeptically, and I still skipped the step of understanding what I was shipping. If I can do it, so can everyone else.

So this post asks an honest question: are we trusting AI too much?

## Why Trust Comes So Easily

LLMs are very good at sounding right. A few things make them easy to believe:

- **Fluent language.** Well-written text feels authoritative, even when it's wrong.
- **Confident tone.** Models rarely hedge unless asked to, and they don't naturally show uncertainty.
- **Speed and convenience.** An instant answer beats an hour of research, and we get used to it.
- **Human-like conversation.** Chatting with a system makes it feel like a knowledgeable person, even though it isn't one.
- **It's often correct.** The more times it's right, the less we check. That's exactly when mistakes slip through.

None of this is a flaw in us. It's how people naturally respond to fluent, helpful, confident sources.

## Where Over-Trust Shows Up

Once you start looking, you see it everywhere.

### In code

Accepting generated code without reading it can bring in bugs, security holes, outdated APIs, or even packages that don't exist. Code that runs is not the same as code that is correct, safe, or maintainable.

### In research and facts

Models can invent citations, misquote sources, and state shaky claims as settled facts. If an answer is copied into a report or a blog post unchecked, the error spreads.

### In decisions

People now ask AI for advice on health, money, legal questions, and relationships. A model can offer useful starting points, but it doesn't know your full situation and it isn't accountable for the outcome.

### In writing and thinking

If we let a model draft every email, plan, and opinion, we may slowly lose practice in organizing our own thoughts. Convenience can quietly turn into dependence.

### In automated systems

When AI outputs flow straight into hiring filters, content moderation, customer support, or financial workflows with no human check, small errors can scale to many people before anyone notices.

## Why Over-Trust Is a Real Problem

It's tempting to say "just verify everything," but there are deeper issues.

- **Automation bias.** People tend to favor suggestions from automated systems, even when their own judgment says otherwise.
- **Skill erosion.** If we stop practicing a skill, we get worse at it, and we also get worse at noticing when the AI is wrong.
- **Hidden bias.** Models learn from human data, so they can reflect and amplify stereotypes and blind spots.
- **Unclear accountability.** When something goes wrong, "the AI said so" is not a satisfying answer for the person affected.
- **Uneven errors.** Models are often least reliable on rare cases, minority groups, niche topics, and edge conditions, which are exactly the cases where mistakes hurt the most.

## But Under-Trust Is Also a Problem

I don't want this post to become "AI is dangerous, avoid it." That would be unrealistic and unhelpful.

If you refuse to use these tools, you may waste hours on tasks they handle well. If you double-check every trivial output, you lose the benefit. Good judgment means matching your level of trust to the situation, not trusting everything or nothing.

A useful way to think about it:

- **Low stakes, easy to check** (naming ideas, rewording a sentence, boilerplate code): trust more, skim quickly.
- **Medium stakes** (documentation, analysis, production code): trust, but review carefully and test.
- **High stakes** (health, legal, financial, safety, or anything affecting other people): treat AI as a starting point, and verify with reliable sources and qualified humans.

## How to Build Healthy Trust

Here's what I'm trying to practice myself.

1. **Read what you ship.** If I can't explain a piece of AI-generated code, it doesn't go into the project.
2. **Verify claims that matter.** Names, numbers, quotes, and citations get checked against original sources.
3. **Ask for sources and uncertainty.** Prompts like "What are you unsure about?" or "Quote the passage that supports this" surface weak spots.
4. **Test, don't assume.** Run the code, write unit tests, and try edge cases.
5. **Seek a second opinion.** Compare with documentation, an expert, or a different approach, especially when the answer is surprising.
6. **Stay in the loop.** Keep a human reviewing decisions that affect people, and make it easy to challenge or reverse AI-assisted outcomes.
7. **Keep practicing the fundamentals.** Write, code, and reason on your own regularly so your judgment stays sharp.
8. **Be honest about AI use.** If AI helped create something, be open about it, especially when others depend on its accuracy.

## What Builders Should Do

If you're building products with GenAI, trust isn't only the user's job. Design systems that help people trust appropriately.

- Show sources and make them easy to open.
- Communicate uncertainty instead of hiding it.
- Let users edit, correct, and override outputs.
- Add review steps for high-stakes actions.
- Log decisions so mistakes can be traced and fixed.
- Test with unusual and adversarial inputs, not just happy paths.
- Avoid marketing language that suggests the system is more reliable than it is.

A good AI product doesn't just give answers. It helps people judge whether to believe them.

## Final Thoughts

So, are we trusting AI too much? In some places, yes. We're too quick to accept fluent answers, too comfortable skipping verification, and too ready to hand over decisions that deserve human judgment. In other places, we may not be using it enough.

The healthiest stance, I think, is calibrated trust: use AI as a powerful assistant, stay curious about how it fails, and keep the final responsibility with people. The question isn't whether to trust AI. It's how much, for what, and with which safeguards.

In the next post, I'll share a practical checklist for reviewing AI-generated code before it reaches production.