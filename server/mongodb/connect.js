import mongoose from 'mongoose';

// Connect to MongoDB
const connectDB = (url) => {
    mongoose.set('strictQuery', true);
    mongoose.connect(url)
    .then(() => console.log('connected to mongo'))
    .catch((err) => {
        console.error('failed to connect with mongo');
        console.error(err);
    });
};
// Export mongoose
export default connectDB;