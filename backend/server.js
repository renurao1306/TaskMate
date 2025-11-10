import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import userRoutes from './routes/UserRoutes.js';


const app = express();
dotenv.config();
connectDB();

app.use(cors());
app.use(express.json());

// routes
app.use("/api/users", userRoutes);

app.listen(process.env.PORT, () => {
    console.log(`Server listening on port: ${process.env.PORT}`);
})