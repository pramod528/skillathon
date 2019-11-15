const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const EventsSchema = new Schema({
  name: { type: String, required: true },
  type: { type: String, required: true },
  length: { type: Number, required: true },
  views: { type: Number, required: true }
});

module.exports = mongoose.model('Events', EventsSchema);