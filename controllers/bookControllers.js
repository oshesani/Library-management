const Book = require('../Model/bookModel');
const Library = require('../Model/libraryModel');

class BookController {
  async addBook(req, res) {
    try {
      const { title, author, publishedYear, libraryId } = req.body;

      const currentYear = new Date().getFullYear();
      if (publishedYear > currentYear) {
        return res.status(400).json({ message: 'Published year cannot be in the future' });
      }

      const library = await Library.findById(libraryId);
      if (!library) {
        return res.status(404).json({ message: 'Library not found' });
      }
      console.log("Library:", library)

      const book = new Book({ title, author, publishedYear, library: library._id });
      await book.save();

      if (!library.books) {
        library.books = [];
      }


      library.books.push(book);
      await library.save();

      res.status(201).json({ message: 'Book added successfully', book });
    } catch (err) {
      res.status(500).json({ message: 'Server error', error: err.message });
    }
  }
}

module.exports = new BookController();


