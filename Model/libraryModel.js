const mongoose = require('mongoose');

const librarySchema = new mongoose.Schema({
  name: { type: String, required: true },
  address: { type: String, required: true },
  books: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Book' }] 
});

const Library = mongoose.model('Library', librarySchema);

module.exports = Library; // Export the model, not an instance

/*const mongoose = require('mongoose');

const librarySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  books: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Book',
    },
  ],
  members: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  ],
}, { timestamps: true });

const Library = mongoose.model('Library', librarySchema);
module.exports = Library;*/
