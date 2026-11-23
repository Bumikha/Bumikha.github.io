Title: Vibe Coding: Productivity Boost or Technical Debt?
Date: 2026-11-23
Category: Opinion
Tags: GenAI, LLM, vibe-coding, AI-coding, technical-debt, software-engineering, opinion
Slug: vibe-coding-productivity-or-technical-debt

## The Weekend App That Almost Fooled Me

A while ago I built a small tool in one evening. I described what I wanted, accepted whatever the AI generated, pasted error messages back when something broke, and kept going until it worked. I barely read the code. By midnight I had a working app, and I felt like a wizard.

A week later I tried to add one small feature and couldn't figure out where to put it. The logic was scattered, names were inconsistent, and two functions did almost the same thing in different ways. The app worked, but I didn't understand it, and that made it fragile.

That experience is the heart of the vibe coding debate. So is it a productivity boost or a technical debt machine? My honest answer: it can be either, depending on how you use it.

## What Is Vibe Coding?

Vibe coding is a style of programming where you describe what you want in plain language, let an AI generate the code, and steer mostly by results: run it, see if it works, ask for changes. You focus on the "vibe" of the outcome rather than reading and understanding every line.

It sits at one end of a spectrum:

- **Vibe coding:** Accept output, judge by whether it runs, rarely read the code.
- **AI-assisted coding:** Use AI for suggestions, but read, edit, and own every line.
- **Traditional coding:** Write everything yourself, with AI as an occasional reference.

Most real-world use falls somewhere in the middle, and where you land should depend on what you're building.

## The Case for Vibe Coding

I don't want to be dismissive, because there are real benefits.

- **Speed to a first version.** Going from idea to working prototype in hours instead of days is a genuine advantage.
- **Lower barrier to entry.** People with ideas but limited programming experience can build things that were previously out of reach.
- **Great for exploration.** Testing whether an idea is worth pursuing before investing real effort is a perfect use case.
- **Less time on boilerplate.** Setup, config, and repetitive code are tedious, and AI handles them well.
- **Fast learning loops.** Seeing a working example quickly can help you understand a new framework or concept.
- **More fun.** Staying in flow and building without friction makes projects feel achievable.

For throwaway scripts, demos, internal tools, and hackathon projects, vibe coding can be a great fit.

## The Case Against: Where Technical Debt Creeps In

Technical debt is the future cost of choosing a quick solution now. Vibe coding makes it easy to take on debt without noticing, because the code looks fine and the app seems to work. Here's where it tends to build up.

### 1. Code nobody understands

If you didn't read it, you can't maintain it. When something breaks, you're debugging a stranger's code, and the stranger is no longer in the room. The moment you can't explain how your own project works, you've lost control of it.

### 2. Inconsistent structure and duplication

AI generates code one prompt at a time, often without a consistent view of the whole project. You can end up with different patterns in different files, repeated logic, and dead code left behind after changes.

### 3. Hidden bugs and weak edge-case handling

"It runs on my example" is not the same as "it's correct." Generated code often handles the happy path well and quietly fails on empty input, large data, unusual characters, or concurrent use.

### 4. Security and privacy gaps

Common risks include hardcoded secrets, missing input validation, SQL injection, weak authentication, overly broad permissions, and outdated or nonexistent dependencies. If you don't review the code, nobody does.

### 5. Missing tests

Vibe-coded projects often have no tests, because the feedback loop is "run it and see." That works until you change something and an old feature breaks without you noticing.

### 6. Dependency sprawl

Models readily add libraries to solve small problems. Each one adds update work, security exposure, and potential conflicts.

### 7. Architecture by accident

Without deliberate design, the project grows into whatever shape the prompts happened to produce. Refactoring it later can cost more than building it properly at the start.

### 8. The "almost works" trap

AI can get you 80% of the way very quickly. The last 20%, including reliability, performance, and edge cases, is where understanding matters most, and that's exactly where vibe coders get stuck.

## When Vibe Coding Makes Sense (and When It Doesn't)

A simple way to decide is to ask what happens if the code is wrong or has to live a long time.

**Good fit:**

- Prototypes and proofs of concept
- Personal scripts and one-off automation
- Hackathon and weekend projects
- Learning experiments
- Throwaway demos

**Be careful:**

- Anything with real users or real data
- Code that will be maintained by a team
- Features that grow over months

**Avoid vibe coding for:**

- Authentication, payments, and security-sensitive code
- Medical, financial, legal, or safety-related systems
- Core infrastructure others depend on
- Anything where a hidden bug could harm people

A useful rule: the longer the code will live and the more people depend on it, the less "vibe" and the more "engineering" it needs.

## How to Get the Speed Without the Debt

Here's the approach I now use. It keeps most of the productivity while avoiding the worst of the mess.

1. **Plan before prompting.** Write a short description of what you're building, the main components, and any constraints. Even half a page helps the AI and you.
2. **Work in small steps.** Ask for one feature or change at a time, so you can review and understand each piece.
3. **Read the code.** At minimum, skim every change. If you can't explain a function, ask the AI to explain it, or rewrite it until you can.
4. **Use version control.** Commit often, work on branches, and review diffs. It makes mistakes easy to undo.
5. **Add tests early.** Ask the AI to write tests, then check that the tests actually test something meaningful. Run them after every change.
6. **Set conventions.** Tell the model your preferred structure, naming, libraries, and style, and keep that guidance in the project so it stays consistent.
7. **Refactor regularly.** After a burst of generation, spend time cleaning up duplicates, renaming things, and removing dead code.
8. **Review for security.** Check inputs, secrets, permissions, and dependencies, especially before sharing anything publicly.
9. **Keep documentation.** A short README that explains how the project works and how to run it will save you weeks later.
10. **Know when to take over.** When the AI starts going in circles, stop prompting, understand the problem yourself, and fix it by hand.

## What This Means for Developers' Skills

There's a bigger question beyond individual projects. If we lean on AI for everything, do we stop building the skills needed to judge its work?

I think the developers who thrive will be the ones who can:

- Break problems down clearly.
- Read and review code quickly and critically.
- Understand architecture, data, and trade-offs.
- Debug when the AI can't.
- Communicate requirements precisely.

Ironically, the better you understand programming fundamentals, the more you get out of AI tools. Vibe coding rewards experienced people most, because they know what to ask for and what to question.

## Quick Checklist

Before shipping something that was vibe coded, ask yourself:

- Can I explain how this works?
- Have I read the generated code, at least the important parts?
- Are there tests, and do they pass?
- Did I check edge cases, errors, and bad input?
- Are secrets, permissions, and dependencies safe?
- Is the structure consistent enough that someone else could continue it?
- Is there a README and a way to run it?
- If this breaks at 2 AM, will I know where to look?

## Final Thoughts

So is vibe coding a productivity boost or technical debt? It's both, and the difference lies in your intent and your habits. For quick experiments, it's a fantastic way to move fast and learn. For software that matters, it's a loan you'll eventually have to repay, with interest.

I still vibe code weekend projects, and I enjoy it. But anything I plan to keep, share, or depend on gets slowed down, read, tested, and cleaned up. The goal isn't to reject the vibes. It's to know when to switch from vibing to engineering.

In the next post, I'll share the project conventions file I give my AI coding tools so the code they generate stays consistent from the first prompt.