import mongoose, { Schema, Document } from 'mongoose';

interface IBook extends Document {
    title: string;
    category: string;
    subcategory: string[];
    reviews: number;
    deletedAt?: Date;
    isDeleted: boolean;
    releasedAt: string;
}

const bookSchema: Schema<IBook> = new Schema({
    title: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    category: {
        type: String,
        required: true,
        trim: true,
    },
    subcategory: [{
        type: String,
        required: true,
        trim: true,
    }],
    reviews: {
        type: Number,
        default: 0,
    },
    deletedAt: {
        type: Date,
    },
    isDeleted: {
        type: Boolean,
        default: false,
    },
    releasedAt: {
        type: String,
        required: true,
        trim: true,
    },
}, { timestamps: true });

const BookModel = mongoose.model<IBook>('Books', bookSchema);

export default BookModel;
