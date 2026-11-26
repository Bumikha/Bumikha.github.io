Title: Building a Personal Knowledge Assistant from My Own Notes
Date: 2026-11-26
Category: Project Walkthrough
Tags: GenAI, LLM, RAG, embeddings, vector-database, personal-knowledge, project
Slug: personal-knowledge-assistant-from-my-notes

## The Problem With My Notes

Like a lot of developers, I take notes everywhere: markdown files, text snippets, PDFs of papers, meeting notes, bookmarks with a few lines of context. The problem is that I almost never find anything again. I remember reading something useful about chunking strategies, but was it in a note, a PDF, or a blog post I saved?

Keyword search only works if I remember the exact words I used. What I wanted was to ask a question in plain English and get an answer based on my own notes, with a pointer to where it came from.

That's a perfect use case for RAG (Retrieval-Augmented Generation), so I decided to build a personal knowledge assistant. This post walks through the design, the steps, and the lessons I learned along the way.

## What I Wanted It to Do

Before writing any code, I defined the goals:

- Answer questions using **only my own notes**, not the model's general memory.
- Show **sources**, so I can open the original note and verify.
- Say **"I don't know"** when the notes don't contain the answer.
- Run **cheaply**, and keep my private notes as private as possible.
- Stay **simple** enough that I can understand and maintain every part.

Having these goals up front kept me from adding features I didn't need.

## The Architecture

The system has two phases: indexing (done ahead of time) and querying (done on every question).

```
INDEXING
Notes (md, txt, pdf)
   -> load and clean text
   -> split into chunks
   -> create embeddings
   -> store chunks + embeddings + metadata in a vector database

QUERYING
User question
   -> embed the question
   -> search the vector database for similar chunks
   -> (optional) rerank the results
   -> build a prompt with the top chunks
   -> LLM answers using only that context, with citations
```

If you've read my earlier posts on RAG and hallucinations, this will look familiar. The interesting part is in the details.

## Step 1: Loading and Cleaning the Notes

My notes were messier than I expected. Some had front matter, some had broken formatting, some were scanned PDFs with strange characters.

What I did:

- Collected notes from a single folder and its subfolders.
- Loaded markdown and text files directly, and extracted text from PDFs.
- Removed obvious noise like repeated headers, page numbers, and empty lines.
- Kept useful metadata for every document: file name, path, title, and last-modified date.

Metadata turned out to matter a lot later, because it's what lets the assistant cite its sources.

## Step 2: Chunking

You can't embed a whole 40-page document and expect good retrieval, so notes are split into smaller pieces called chunks.

My lessons about chunking:

- **Too big:** Chunks contain several topics, so the match is vague and the prompt gets bloated.
- **Too small:** Chunks lose context and don't make sense alone.
- **Split on structure, not just length.** For markdown, splitting at headings keeps each idea together.
- **Use a small overlap** between chunks so a thought isn't cut in the middle.
- **Attach the heading and file name** to each chunk so it carries its own context.

I started with chunks of a few hundred words, split on headings first and length second, then adjusted after looking at real results.

## Step 3: Creating Embeddings

An embedding turns text into a list of numbers that captures its meaning, so that similar ideas end up close together. That's what lets me search "how do I split documents for retrieval?" and find a note titled "chunking tips" that never uses the word "retrieval."

Choices to make here:

- **Hosted embedding API vs local model.** A hosted API is easy and strong. A local embedding model keeps notes on my machine and costs nothing per call. For private notes, local is attractive.
- **Consistency.** The same embedding model must be used for notes and questions, or the results are meaningless.
- **Batching.** Embedding thousands of chunks one at a time is slow, so I process them in batches.

## Step 4: Storing Everything in a Vector Database

Each chunk is stored with its embedding and metadata. For a personal project, a lightweight database that runs locally is plenty. You don't need a large distributed system for a few thousand notes.

What I store per chunk:

- The chunk text
- Its embedding
- Source file name and path
- Heading or section
- Last-modified date

I also set up incremental updates, so when I edit or add a note, only that file is re-processed instead of rebuilding everything.

## Step 5: Retrieval

When I ask a question, the system embeds it and finds the most similar chunks. Early on, I just took the top 3 results and hoped for the best.

Improvements that helped:

- **Retrieve more, then narrow down.** Fetch around 10 candidates, then rerank and keep the best 3 to 5.
- **Hybrid search.** Combining vector search with keyword search catches exact terms like function names, acronyms, and error codes that embeddings sometimes miss.
- **Metadata filters.** Being able to limit a search to one folder or a date range is very useful.
- **A similarity threshold.** If nothing is close enough, the assistant should admit it rather than answer from weak matches.

My most important habit: print the retrieved chunks and read them before judging the final answer. Most "bad answers" turned out to be retrieval problems.

## Step 6: Writing the Prompt

The prompt is where I enforce the goals I set at the start.

```
You are a personal knowledge assistant. Answer the question using only
the information in the <notes> section.

Rules:
- If the answer is not in the notes, say: "I couldn't find that in your notes."
- Do not use outside knowledge.
- After each claim, cite the source file in brackets, like [file-name].
- Keep the answer concise.

<notes>
[source: chunking-tips.md | section: Overlap]
...chunk text...

[source: rag-pipeline.md | section: Retrieval]
...chunk text...
</notes>

<question>
How should I split markdown notes for retrieval?
</question>
```

A few details that helped:

- Clearly separating notes from the question makes the prompt easier for the model to follow.
- Labeling each chunk with its source makes citations reliable.
- Explicitly allowing "I couldn't find that" cuts down on made-up answers.
- Treating the notes as data, not instructions, reduces the risk of text inside a note hijacking the assistant.

## Step 7: Testing It Properly

At first I tested it by asking a few questions and feeling good about the answers. That doesn't tell you much, so I built a small evaluation set:

- About 30 questions based on real things I'd searched for before.
- The note where each answer should be found.
- A few questions that **can't** be answered from my notes, to check that it says "I don't know."

For each question I checked two things: did retrieval find the right note, and did the final answer stay faithful to it? Separating those two checks made debugging much easier.

## Problems I Ran Into

Not everything worked the first time. Some real issues:

- **Duplicate and outdated notes.** I had three versions of the same idea, and the assistant sometimes cited the oldest. Using the modified date and cleaning up duplicates helped.
- **Notes without context.** A chunk saying "use the second option" is useless alone. Adding headings and titles to chunks fixed many of these.
- **Tables and code blocks.** Splitting in the middle of a code block ruined the meaning, so I keep code blocks intact.
- **Over-long answers.** The model sometimes added general advice beyond my notes. Tightening the prompt fixed that.
- **Scanned PDFs.** Poor text extraction gave poor embeddings. Fixing the source text mattered more than changing the model.

## Privacy and Safety Notes

Since this is built on personal notes, I thought carefully about what leaves my machine.

- Decide whether to use hosted or local models for embeddings and answers, based on how sensitive the notes are.
- Exclude folders containing passwords, keys, financial details, or other private information.
- Remember that anything sent to a hosted API is sent to a third party, so check its data policy.
- Never store secrets in notes that get indexed.
- Be careful with notes copied from the web, since they could contain text that tries to give the model instructions.

## Ideas for Next Steps

Once the basic version worked, I made a list of upgrades I might try:

- A simple chat interface instead of a command line.
- Answer follow-up questions with conversation history.
- Automatically re-index when files change.
- Add a "related notes" feature to surface connections I'd forgotten.
- Try reranking models and compare them on my test set.
- Support questions that span several notes with a short summarization step.

## Quick Checklist

If you want to build your own, here's a short list to follow:

- Define what the assistant should and shouldn't do.
- Collect and clean your notes, keeping useful metadata.
- Chunk by structure, with a little overlap.
- Pick an embedding approach that fits your privacy needs.
- Store chunks with embeddings and metadata.
- Look at what retrieval returns before judging the answers.
- Require citations and allow "I don't know."
- Build a small test set, including unanswerable questions.
- Keep sensitive notes out of the index.

## Final Thoughts

I expected this project to be about AI. It turned out to be mostly about organizing information well: clean notes, sensible chunks, good metadata, and honest evaluation. The LLM is the smallest part of the system.

The payoff has been real, though. I now ask my notes questions instead of digging through folders, and when the assistant cites a note I forgot I had written, it feels like having a slightly better memory.

If you're thinking about learning RAG, building something on your own data is one of the best ways to do it. You already know what a good answer looks like, which makes it much easier to tell whether your system works.

In the next post, I'll compare vector search, keyword search, and hybrid search on my own notes, with real examples of where each one wins.