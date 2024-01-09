const mongoose = require('mongoose');
const { Schema, model } = mongoose;
const { ObjectId } = Schema;

const lessonSchema = new Schema({
  title: {
    type: String,
    trim: true,
    minlength: 3,
    maxlength: 320,
    required: true,
  },
  slug: {
    type: String,
    lowercase: true,
  },
  content: {
    type: {}, // Ensure this type is correctly defined as per your requirements
    minlength: 200,
  },
  video: {}, // Ensure this type is correctly defined as per your requirements
  free_preview: {
    type: Boolean,
    default: false,
  },
  
}, { timestamps: true });

const courseSchema = new Schema({
  name: {
    type: String,
    trim: true,
    minlength: 3,
    maxlength: 320,
    required: true,
  },
  slug: {
    type: String,
    lowercase: true,
  },
  description: {
    type: {}, // Ensure this type is correctly defined as per your requirements
    minlength: 200,
    required: true,
  },
  price: {
    type: Number,
    default: 9.99,
  },
  image: {}, // Ensure this type is correctly defined as per your requirements
  category: String,
  published: {
    type: Boolean,
    default: false,
  },
  paid: {
    type: Boolean,
    default: true,
  },
  instructor: {
    type: ObjectId,
    ref: 'User',
    required: true,
  },

  completed: [{ type: ObjectId, ref: 'Completed' }],
  lessons: [lessonSchema],
}, { timestamps: true });

module.exports = model('Course', courseSchema);
