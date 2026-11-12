require(‘dotenv’).config();
const express = require(‘express’);
const cors = require(‘cors’);
const bcrypt = require(‘bcrypt’);
const jwt = require(‘jsonwebtoken’);
const rateLimit = require(‘express-rate-limit’);
const { MongoClient, ObjectId } = require(‘mongodb’);

const app = express();
app.use(express.json({ limit: ‘1mb’ }));
app.use(cors({ origin: process.env.SITE_ORIGIN }));

const client = new MongoClient(process.env.MONGODB_URI);
const db = client.db(‘blog’);

const loginLimiter = rateLimit({ windowMs: 15 * 60 * 1000, max: 10 });

function auth(req, res, next) {
try {
const token = (req.headers.authorization || ‘’).replace(‘Bearer ‘, ‘’);
req.user = jwt.verify(token, process.env.JWT_SECRET);
next();
} catch {
res.status(401).json({ error: ‘Not logged in’ });
}
}

const editorOnly = (req, res, next) =>
req.user.role === ‘editor’ ? next() : res.status(403).json({ error: ‘Editors only’ });

const slugify = s => s.toLowerCase().trim()
.replace(/[^a-z0-9]+/g, ‘-’).replace(/^-+|-+$/g, ‘’);

const validDate = d => /^\d{4}-\d{2}-\d{2}$/.test(d) && !isNaN(new Date(d));

app.get(‘/’, (req, res) => res.send(‘ok’));

app.post(‘/login’, loginLimiter, async (req, res) => {
const { username, password } = req.body;
const user = await db.collection(‘users’).findOne({ username });
if (!user || !(await bcrypt.compare(password, user.passwordHash)))
return res.status(401).json({ error: ‘Wrong username or password’ });
const role = user.role || ‘author’;
const token = jwt.sign({ username, role }, process.env.JWT_SECRET, { expiresIn: ‘12h’ });
res.json({ token, role });
});

// Create a post (any logged-in user)
app.post(‘/posts’, auth, async (req, res) => {
const { title, date, category, tags, slug, content } = req.body;
if (!title || !content) return res.status(400).json({ error: ‘Title and content required’ });
if (date && !validDate(date)) return res.status(400).json({ error: ‘Date must be YYYY-MM-DD’ });
const postDate = date || new Date().toISOString().slice(0, 10);
const finalSlug = slugify(slug || ‘’) || m-${postDate}-${slugify(title)};
try {
await db.collection(‘posts’).insertOne({
title, date: postDate, category: category || ‘General’, tags: tags || ‘’,
slug: finalSlug, content, author: req.user.username, status: ‘ready’, createdAt: new Date(),
});
res.json({ ok: true, slug: finalSlug });
} catch (e) {
res.status(409).json({ error: ‘This slug already exists. Choose a different slug.’ });
}
});

// Editor endpoints
app.get(‘/posts’, auth, editorOnly, async (req, res) => {
const posts = await db.collection(‘posts’)
.find({}, { projection: { content: 0 } })
.sort({ createdAt: -1 }).toArray();
res.json(posts);
});

app.get(‘/posts/:id’, auth, editorOnly, async (req, res) => {
const post = await db.collection(‘posts’).findOne({ _id: new ObjectId(req.params.id) });
post ? res.json(post) : res.status(404).json({ error: ‘Not found’ });
});

app.put(‘/posts/:id’, auth, editorOnly, async (req, res) => {
const { title, date, category, tags, content, status } = req.body;
if (!title || !content) return res.status(400).json({ error: ‘Title and content required’ });
if (date && !validDate(date)) return res.status(400).json({ error: ‘Date must be YYYY-MM-DD’ });
const update = {
title, category: category || ‘General’, tags: tags || ‘’, content,
editedBy: req.user.username, updatedAt: new Date(),
};
if (date) update.date = date;
if ([‘ready’, ‘draft’].includes(status)) update.status = status;
const r = await db.collection(‘posts’).updateOne(
{ _id: new ObjectId(req.params.id) }, { $set: update });
r.matchedCount ? res.json({ ok: true }) : res.status(404).json({ error: ‘Not found’ });
});

client.connect().then(async () => {
await db.collection(‘posts’).createIndex({ slug: 1 }, { unique: true });
app.listen(process.env.PORT || 3000, () => console.log(‘API running’));
}).catch(err => { console.error(‘MongoDB connection failed:’, err.message); process.exit(1); });
Message Hema Varshini