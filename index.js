const express = require('express');
const mongoose = require('mongoose');
const BlogPost = require('./models/blogPost');  // Assuming your schema is in models folder
const app = express();
const port = 3000;

// Connect to MongoDB (replace with your MongoDB URI)
mongoose.connect('mongodb://localhost:27017/blogApp', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Failed to connect to MongoDB', err));

app.use(express.json());  // To parse JSON bodies

// Root route
app.get('/', (req, res) => {
  res.send('Welcome to the Blog Application!');
});

// Routes for CRUD operations (create, read, update, delete)
app.post('/posts', async (req, res) => {
  const { title, content, author } = req.body;
  try {
    const newPost = new BlogPost({ title, content, author });
    await newPost.save();
    res.status(201).send(newPost);
  } catch (err) {
    res.status(400).send(err);
  }
});

app.get('/posts', async (req, res) => {
  try {
    const posts = await BlogPost.find();
    res.status(200).send(posts);
  } catch (err) {
    res.status(400).send(err);
  }
});

app.get('/posts/:id', async (req, res) => {
  try {
    const post = await BlogPost.findById(req.params.id);
    if (!post) return res.status(404).send('Post not found');
    res.status(200).send(post);
  } catch (err) {
    res.status(400).send(err);
  }
});

app.put('/posts/:id', async (req, res) => {
  try {
    const post = await BlogPost.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!post) return res.status(404).send('Post not found');
    res.status(200).send(post);
  } catch (err) {
    res.status(400).send(err);
  }
});

app.delete('/posts/:id', async (req, res) => {
  try {
    const post = await BlogPost.findByIdAndDelete(req.params.id);
    if (!post) return res.status(404).send('Post not found');
    res.status(200).send(post);
  } catch (err) {
    res.status(400).send(err);
  }
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
