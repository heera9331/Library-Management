import mongoose from "mongoose";

const connectDB = async () => {
    const uri = 'mongodb://127.0.0.1:27017/CollegeDB';

    mongoose.connect(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
        .then(() => {
            console.log('Connected to MongoDB successfully!');
            // Continue with your application logic here
        })
        .catch((error) => {
            console.error('Error connecting to MongoDB:', error.message);
        });
}

export default connectDB;