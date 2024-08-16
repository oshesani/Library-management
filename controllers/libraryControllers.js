const Library = require('../Model/libraryModel');

class LibraryController {
  async createLibrary(req, res) {
    try {
      const { name, address } = req.body;
      const library = new Library({ name, address });
      await library.save();
      res.status(201).json({ message: 'Library created successfully', library });
    } catch (err) {
      res.status(500).json({ message: 'Server error', error: err.message });
    }
  }
}

module.exports = new LibraryController();

