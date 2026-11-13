Title: The Most Common Mistakes I See in GenAI Projects
Date: 2026-11-13
Category: Lessons Learned
Tags: GenAI, LLM, RAG, AI-agents, best-practices, lessons-learned
Slug: common-mistakes-in-genai-projects

## Learning the Hard Way

When I started building with GenAI, my first few projects looked amazing in demos and fell apart the moment real users touched them. The prompt that worked on my three favorite examples failed on the fourth. The RAG pipeline that looked smart returned the wrong document. The agent that seemed magical got stuck in a loop and burned through my API credits.

Since then I've built, broken, and rebuilt a lot of GenAI projects, and I keep seeing the same mistakes, in my own work and in others'. This post is a list of the most common ones, and what I do differently now.

## 1. Starting With the Model Instead of the Problem

The most common mistake is beginning with "let's add AI" instead of "what problem are we solving?"

A model is a tool, not a goal. Before writing any code, I now ask:

- Who is the user, and what are they trying to get done?
- Is this problem actually a good fit for an LLM, or would a simple rule, search, or script work better?
- What does success look like, and how will I measure it?

Sometimes the right answer is a regular `if` statement. That's fine.

## 2. Judging Quality by Vibes

Many teams test a prompt with a few examples, see good results, and ship. Then they change the prompt, and nobody knows whether things got better or worse.

Without evaluation, every change is a guess. What helps:

- Build a small test set of 30 to 50 real examples, including hard and unusual ones.
- Define what "good" means for each (correct answer, right format, safe tone).
- Re-run the set whenever you change the prompt, model, or retrieval logic.
- Review real user conversations regularly.

A small, honest test set beats a large amount of gut feeling.

## 3. Treating Prompts Like Throwaway Text

Prompts are part of your application logic, but they're often pasted into code, edited casually, and never tracked.

Treat them like code:

- Keep them in version control.
- Give them clear structure and meaningful names.
- Document why a change was made.
- Test them before deploying.

When something breaks in production, you'll be glad you can see exactly what changed.

## 4. Writing Vague or Overloaded Prompts

Prompts like "Analyze this and give me insights" leave the model guessing. On the other extreme, a single prompt that tries to do ten things at once often does all of them poorly.

Better habits:

- State the task, audience, format, and constraints clearly.
- Give examples of what good output looks like.
- Split complex work into smaller steps that you can inspect.
- Separate instructions from data using clear delimiters.

## 5. Ignoring Retrieval Quality in RAG

When a RAG system gives bad answers, people often blame the LLM. In my experience, the problem is usually retrieval. If the wrong chunks reach the prompt, even the best model will answer from the wrong material.

Common causes:

- Chunks that are too big, too small, or split in the middle of an idea.
- Missing metadata, so you can't filter by source, date, or type.
- Using only vector search when keyword search would help (hybrid search often does better).
- No reranking step to push the best results to the top.
- Never checking what was actually retrieved.

My rule: always look at the retrieved chunks first. If they're wrong, fix retrieval before touching the prompt.

## 6. Not Planning for Hallucinations

Models sometimes produce confident, wrong answers, and many projects have no plan for it. The result is an app that is right 90% of the time and dangerously wrong the other 10%.

Plan for it from day one:

- Ground answers in provided sources and require citations.
- Allow the model to say "I don't know."
- Add verification steps for facts, code, and structured output.
- Include test cases that *can't* be answered from your data.
- Keep a human in the loop where mistakes are costly.

## 7. Using Fine-Tuning When Prompting or RAG Would Do

Fine-tuning sounds powerful, so teams reach for it too early. But it takes data, time, and money, and it's mostly good at changing style, format, and behavior. It's a weak way to add new facts.

My order of attack:

1. Improve the prompt and add examples.
2. Add retrieval (RAG) for knowledge.
3. Add tools for calculations and live data.
4. Consider fine-tuning only when the simpler approaches clearly aren't enough.

## 8. Building Overcomplicated Agents

Multi-agent systems with planners, critics, and tool-using sub-agents look impressive in diagrams. In practice, every extra agent adds cost, latency, and new ways to fail.

What I do now:

- Start with a single prompt, then a simple chain, then add autonomy only when needed.
- Keep the number of tools small and their descriptions clear.
- Set limits on steps, retries, and spending.
- Log every step so I can see why the agent did what it did.

A boring workflow that works beats a clever agent that wanders.

## 9. Forgetting Cost and Latency

A prototype with ten requests a day is cheap. A product with ten thousand users is not. Long prompts, large context windows, repeated calls, and the biggest model for every task add up fast, and users won't wait ten seconds for a reply.

Ways to keep things under control:

- Use smaller, cheaper models for simple tasks and larger ones only where they matter.
- Trim unnecessary context.
- Cache repeated results where it's safe.
- Stream responses so the app feels faster.
- Track token usage and set budgets and alerts from the start.

## 10. Skipping Error Handling and Guardrails

APIs time out, rate limits hit, and models return malformed JSON or refuse a request. Many projects assume everything works and crash when it doesn't.

Prepare for reality:

- Add retries with backoff, timeouts, and fallbacks.
- Validate outputs against a schema before using them.
- Handle empty, long, or strange inputs.
- Filter or flag unsafe content where relevant.
- Decide what the user sees when AI fails, because it will.

## 11. Overlooking Security and Privacy

GenAI adds new risks that traditional apps don't have:

- **Prompt injection.** Text in a document, email, or web page can contain instructions that try to hijack the model. Treat external content as data, not as commands.
- **Data leakage.** Sending sensitive or personal data to a third-party API without thinking about it is a real risk.
- **Over-powerful tools.** If an agent can delete files or send emails, limit what it can do and require approval for risky actions.
- **Secrets in prompts.** Never put API keys or credentials where the model or logs can expose them.

Think about what could go wrong *before* launch, not after.

## 12. Ignoring the User Experience

A model that gives correct answers can still make a bad product. Common UX gaps:

- No indication of what the AI can and can't do.
- No way to see sources, edit the output, or give feedback.
- Long blocks of text instead of clear, structured results.
- Hiding uncertainty so users trust everything equally.

Good GenAI products help users judge, correct, and control the output.

## 13. Chasing Every New Model and Tool

New models and frameworks appear weekly, and it's tempting to rewrite everything each time. But constant switching means you never learn what's actually working.

I try to:

- Keep model calls behind a thin abstraction so I can swap them when it makes sense.
- Use my test set to compare a new model before switching.
- Choose tools because they solve a real problem, not because they're trending.

## 14. Not Monitoring After Launch

Shipping is the beginning, not the end. Models get updated, user behavior changes, and data drifts. Without monitoring, quality can decline quietly.

At minimum, track:

- Error rates, latency, and cost.
- User feedback such as thumbs up/down and corrections.
- A sample of real conversations reviewed by a human.
- Your test set results over time.

## Quick Checklist

Before calling a GenAI project ready, ask yourself:

- Do I know the problem and how success is measured?
- Do I have a test set and a way to re-run it?
- Are prompts versioned and structured?
- Have I checked what retrieval actually returns?
- Is there a plan for hallucinations and "I don't know"?
- Is the architecture as simple as it can be?
- Are cost, latency, and failures under control?
- Have I thought about prompt injection, privacy, and tool permissions?
- Can users see sources, give feedback, and correct the output?
- Will I notice if quality drops after launch?

## Final Thoughts

Almost none of these mistakes are about the model. They're about engineering habits: defining the problem, measuring results, keeping things simple, and planning for failure. The good news is that these are skills we already know from software development, and they apply to GenAI just as much.

I still make several of these mistakes myself, which is exactly why I'm writing them down. If you recognize your own project in this list, you're in good company.

In the next post, I'll walk through how to build a small evaluation set for an LLM app, step by step, so you can stop judging quality by vibes.