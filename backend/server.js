import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import userRoutes from './routes/UserRoutes.js';
import tasksRoutes from './routes/TaskRoutes.js';


const app = express();
dotenv.config();
connectDB();

app.use(cors());
app.use(express.json());

// routes
app.use("/api/users", userRoutes);
app.use('/api/tasks', tasksRoutes)

app.listen(process.env.PORT, () => {
    console.log(`Server listening on port: ${process.env.PORT}`);
})