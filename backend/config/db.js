import mongoose from 'mongoose';

const connectDB = async () => {
    try{
        await mongoose.connect(process.env.DB_URI);
        console.log('Successfully connected to DB!');
    } catch(err) {
        console.error(`Error while connecting to DB: ${err.message}`);
        process.exit(1);
    }
}

export default connectDB;