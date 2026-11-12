import os, pathlib, re, shutil
from pymongo import MongoClient

def one_line(s):
    return re.sub(r"\s+", " ", str(s)).strip()

out = pathlib.Path("content/mobile")
shutil.rmtree(out, ignore_errors=True)
out.mkdir(parents=True)

db = MongoClient(os.environ["MONGODB_URI"])["blog"]
count = 0
for p in db.posts.find({"status": "ready"}):
    header = (
        f"Title: {one_line(p['title'])}\n"
        f"Date: {p['date']}\n"
        f"Category: {one_line(p.get('category', 'General'))}\n"
        f"Tags: {one_line(p.get('tags', ''))}\n"
        f"Slug: {p['slug']}\n"
        f"Author: {p['author']}\n"
    )
    (out / f"{p['slug']}.md").write_text(header + "\n" + p["content"] + "\n", encoding="utf-8")
    count += 1
print("synced", count, "posts")
