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
  // Optional for this iteration, can be implemented later
  video: {}, // Ensure this type is correctly defined as per your requirements
  // Optional for this iteration, can be implemented later
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
    type: String, // Ensure this type is correctly defined as per your requirements
    minlength: 20, // Increase limit for production
    required: true,
  },
  // Price of the course
  price: {
    type: Number,
    default: 9.99,
  },
  // Thumbnail for the course
  image: {
    type: String,
    default: '/avatar.png'
  },
  category: String,
  published: {
    type: Boolean,
    default: false,
  },
  // Defines if the course is free or paid
  paid: {
    type: Boolean,
    default: true,
  },
  instructor: {
    type: ObjectId,
    ref: 'User',
    required: true,
  },
  lessons: [ lessonSchema ],
}, { timestamps: true });

module.exports = model('Course', courseSchema);
