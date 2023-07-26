import mongoose from "mongoose";

const bookSchema = new mongoose.Schema({
    name: String,
    bookId: {
        type: Number,
        unique: true,
        required: true
    },
    category: String,
    author: String,
    count: Number
})

const Book = mongoose.model('book', bookSchema);

export default Book;