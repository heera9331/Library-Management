import mongoose from "mongoose";

const cardSchema = new mongoose.Schema({
    cardNo: {
        type: Number,
        unique: true,
        required: true,
    },
    enrollno: {
        type: String,
        unique: true,
        required: true
    },
    date: Date,
    history: Array({ bookId: Number, issue: Date, submit: {type: Date, default: null}}),
    bookCount: {
        type: Number,
        default: 0
    }
});

const Card = mongoose.model('card', cardSchema);
export default Card;