import { Request, Response } from 'express';
import validate from '../validators/validator';
import moment from 'moment';
import BookModel from '../models/booksModel';
import mongoose from 'mongoose';


//  creating a book
const createBook = async function (req: Request, res: Response) {
    try {
        const data = req.body;

        const { title, category, subcategory, releasedAt } = data;
        console.log(data);

        // Empty body check
        if (!validate.isValidRequestBody(data)) {
            return res.status(400).send({ status: false, message: 'Data is required' });
        }

        // Title check
        if (!validate.isValidField(title)) {
            return res.status(400).send({ status: false, message: 'Title is required' });
        }

        const titleCheck = await BookModel.findOne({ title: data.title });
        if (titleCheck) {
            return res.send({ msg: `${title} Title already exists` });
        }

        // Category check
        if (!validate.isValidField(category)) {
            return res.status(400).send({ status: false, message: 'Category is required' });
        }

        // Subcategory check
        if (!validate.isValidField(subcategory) || !Array.isArray(subcategory)) {
            return res.status(400).send({ status: false, message: 'Subcategory is required' });
        }

        // ReleasedAt check
        if (!validate.isValidField(releasedAt)) {
            return res.status(400).send({ status: false, message: 'Released date is required' });
        }

        // Regex check for releasedAt
        if (!(/^\d{4}\-(0?[1-9]|1[012])\-(0?[1-9]|[12][0-9]|3[01])$/.test(releasedAt))) {
            return res.status(400).send({ status: false, message: 'Released date check' });
        }

        // Data creation
        const createdData = await BookModel.create(data);
        res.status(201).send({ status: true, message: 'Success', data: createdData });
    } catch (error) {
        res.status(500).send({ status: false, message: error });
    }
};

// get all books

const getAllBooks = async (req: Request, res: Response) => {
    try {
        const allBooks = await BookModel.find().sort({ title: 1 });

        if (!allBooks) {
            return res.status(200).send({ status: false, message: 'No book found' });
        } else {
            return res.status(200).send({ status: true, message: allBooks });
        }
    } catch (error) {
        res.status(500).send({ status: false, message: error });
    }
};

// get book by Id

const getBookByID = async (req: Request, res: Response) => {
    try {
        const id = req.params.bookId;

        if (!validate.isValidField(id)) {
            return res.status(400).send({ status: false, message: 'Book Id is Required' });
        }
        if (!mongoose.isValidObjectId(id)) {
            return res.status(400).send({ status: false, message: 'Invalid Book Id' });
        }
        const findBookData = await BookModel.findOne({ _id: id, isDeleted: false }).select({ __v: 0 });
        if (!validate.isValidField(findBookData)) {
            return res.status(404).send('No Book Found');
        } else {
            return res.status(200).send({ status: true, message: 'Book List', data: findBookData });
        }
    } catch (error) {
        console.log(error);
        res.status(500).send({ status: false, message: error });
    }
};

// update book by ID
const updateBooksById = async (req: Request, res: Response) => {
    try {
        const data = req.body;

        if (!validate.isValidRequestBody(data)) {
            return res.status(400).send({ status: false, msg: 'Data is required' });
        }

        const bookId = req.params.bookId;

        if (!validate.isValidObjectId(bookId)) {
            return res.status(400).send({ status: false, msg: 'Not a valid book Id' });
        }

        const bookIdCheck = await BookModel.findOne({ _id: bookId, isDeleted: false });

        if (!bookIdCheck) {
            return res.status(400).send({ status: false, msg: 'Book not found' });
        }

        const titleCheck = await BookModel.findOne({ title: data.title, isDeleted: false });

        if (titleCheck) {
            return res.status(400).send({ msg: `${titleCheck.title}  already exists` });
        }

        const updatedBooks: any = {};

        if (validate.isValidField(data.title)) {
            updatedBooks.title = data.title;
        }

        if (validate.isValidField(data.releasedAt)) {
            if (!moment(data.releasedAt, 'YYYY-MM-DD', true).isValid()) {
                return res.status(400).send({ status: false, message: 'Invalid Date Format' });
            }
            updatedBooks.releasedAt = data.releasedAt;
        }

        const update = await BookModel.findOneAndUpdate({ _id: bookId }, updatedBooks, { new: true });

        res.status(200).send({ status: true, message: 'Successfully Updated', data: update });
    } catch (error) {
        console.log(error);
        res.status(500).send({ status: false, message: error });
    }
};

// delete book by ID
const deleteBookByID = async (req: Request, res: Response) => {
    try {
        const bookIdToBeDeleted = req.params.bookId;
        if (!bookIdToBeDeleted) return res.status(400).send({ status: false, msg: 'Book Id is required' });

        const validBookId = await BookModel.findOne({ _id: bookIdToBeDeleted, isDeleted: false });
        if (!validBookId) return res.status(400).send({ status: false, msg: 'Book does not exist' });

        const isDeletedStatus = await BookModel.findOne({ _id: bookIdToBeDeleted, isDeleted: false });
        if (!isDeletedStatus) return res.status(404).send({ status: false, msg: 'Book is already deleted' });

        const deletedDate = new Date();
        const data = await BookModel.findByIdAndUpdate({ _id: bookIdToBeDeleted }, { isDeleted: true, deletedAt: deletedDate }, { new: true });

        return res.status(200).send({ status: true, msg: data });
    } catch (error) {
        return res.status(500).send({ status: false, msg: error });
    }
};


export { createBook, getAllBooks, getBookByID, updateBooksById, deleteBookByID };
