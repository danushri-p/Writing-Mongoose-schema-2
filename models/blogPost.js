const mongoose = require('mongoose');

// Comment Schema
const commentSchema = new mongoose.Schema({
  username: { type: String, required: true },
  message: { type: String, required: true },
  commentedAt: { type: Date, default: Date.now }
});

// Blog Post Schema
const blogPostSchema = new mongoose.Schema({
  title: { 
    type: String, 
    required: true, 
    unique: true, 
    minlength: 5 
  },
  content: { 
    type: String, 
    required: true, 
    minlength: 50 
  },
  author: { type: String, required: true },
  tags: { type: [String], default: [] },
  category: { type: String, default: 'General' },
  likes: { type: [String], default: [] },
  createdAt: { type: Date, default: Date.now },
  comments: [commentSchema]  // Embed comments as subdocuments
});

// Blog Post Model
const BlogPost = mongoose.model('BlogPost', blogPostSchema);

module.exports = BlogPost;
