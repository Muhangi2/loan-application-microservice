import express from 'express';
import cors from 'cors';
import loanRoutes from './routes/loanRoutes';
import errorHandler from './middleware/errorHandler';
import connectDB from './config/db';
import dotenv from 'dotenv';
import morgan from 'morgan';

dotenv.config();
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/loans', loanRoutes);

// Error Handler
app.use(morgan('combined'));
app.use(errorHandler);

export default app;
