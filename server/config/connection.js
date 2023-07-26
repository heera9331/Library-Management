import mongoose from "mongoose";

const connectDB = async () => {
    // const uri = 'mongodb://127.0.0.1:27017/CollegeDB';
    const uri = 'mongodb+srv://heera7242:heera7242@cluster0.ikuk93s.mongodb.net/CollegeDB';

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