import express from 'express';
import cors from 'cors';
import loanRoutes from './routes/loanRoutes';
import errorHandler from './middleware/errorHandler';
import connectDB from './config/db';
import dotenv from 'dotenv';

dotenv.config();
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/loans', loanRoutes);

// Error Handler
app.use(errorHandler);

export default app;
