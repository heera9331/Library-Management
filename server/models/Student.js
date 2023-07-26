import mongoose from "mongoose";

const studentSchema = new mongoose.Schema({
    name: {
        type:String,
        required: true
    },
    enrollno: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type:String,
        required: true
    },
    card: {
        type: Boolean,
        required: true, 
        default: false
    }
});

const Student = mongoose.model('student', studentSchema);

export default Student;

