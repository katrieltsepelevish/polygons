import mongoose from 'mongoose';

export const connectToDatabase = async () => {
    const MONGO_URI =
        process.env.MONGO_URI || 'mongodb://localhost:27017/polygons';

    try {
        await mongoose.connect(MONGO_URI);
        console.log('Connected to MongoDB');
    } catch (error) {
        console.error('MongoDB connection error:', error);
        process.exit(1);
    }
};
