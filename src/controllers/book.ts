import { RequestHandler } from 'express';
import Book from '../models/Book';

export const getAll: RequestHandler = async (req, res) => {
  try {
    const books = await Book.findAll();
    return res.status(200).json({ message: 'Success', data: { books: books || [] } });
  } catch (e) {
    return res.status(500).send();
  }
};

export const getOne: RequestHandler = async (req, res) => {
  try {
    const { id } = req.params;
    const book = await Book.findOne({ where: { id } });
    return res.status(200).json({ message: 'Success', data: { book: book || {} } });
  } catch (e) {
    return res.status(500).send();
  }
};

export const createBook: RequestHandler = async (req, res) => {
  try {
    const { title, author, description, imageUrl, pdfBase64, rating, price } = req.body;
    await Book.create({ title, author, description, imageUrl, pdfBase64, rating, price });
    return res.status(200).send({
      message: 'Book created successfully'
    });
  } catch (e) {
    return res.status(500).send(e);
  }
};

export const updateBook: RequestHandler = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, author, description, imageUrl, pdfBase64, price, rating } = req.body;
    await Book.update(
      { title, author, description, imageUrl, pdfBase64, price, rating },
      { where: { id } }
    );
    return res.status(200).send({
      message: 'Book details updated successfully'
    });
  } catch (e) {
    return res.status(500).send(e);
  }
};

export const destroyBook: RequestHandler = async (req, res) => {
  try {
    const { id } = req.params;
    const book = await Book.findOne({ where: { id } });
    if (book) {
      await book.destroy();
      return res.status(200).json({ message: 'Book deleted successfully' });
    } else {
      return res.status(404).json({ message: 'Book not found' });
    }
  } catch (e) {
    return res.status(500).send();
  }
};
