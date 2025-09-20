// models/Book.model.js
import mongoose from 'mongoose';

const bookSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  category: {
    type: String,
    enum: ['Free', 'Paid'],
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  pdf: {
    type: String,
    required: function () {
      return this.category === 'Free';
    },
    // Add tags, genre, or any field to improve similarity checks
tags: [String],
genre: String,
author: String,

  },
  downloads: {
  type: Number,
  default: 0
},
purchases: {
  type: Number,
  default: 0
}
});

const Book = mongoose.model('Book', bookSchema);
export default Book;
