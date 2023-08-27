import express from 'express';
import * as bookController from './src/controller/bookController';

const router = express.Router();

// Book API
router.post('/api/books', bookController.createBook);
router.get('/api/books', bookController.getAllBooks);
router.get('/api/books/:id', bookController.getBookByID);
router.delete('/api/books/:id', bookController.deleteBookByID);
router.put('/api/books/:id', bookController.updateBooksById);

export default router;
