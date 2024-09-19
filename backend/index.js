import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import authRoute from './Routes/auth.js';
import userRoute from './Routes/user.js';
import tutorRoute from './Routes/tutor.js';
import reviewRoute from './Routes/review.js';

dotenv.config();

const app = express();
const port = process.env.PORT || 6000;

// Updated CORS configuration
const corsOptions = {
    origin: 'http://localhost:5173', // Allow requests from this origin
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allow specific HTTP methods
    allowedHeaders: ['Content-Type', 'Authorization'], // Allow specific headers
};

app.use(cors(corsOptions)); // Apply CORS middleware

app.get('/', (req, res) => {
    res.send('Api is working');
});

// Database connection
mongoose.set('strictQuery', false);
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log('MongoDB database is connected successfully');
    } catch (err) {
        console.log('MongoDB database connection has failed');
    }
};

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use('/api/v1/auth', authRoute);
app.use('/api/v1/users', userRoute);
app.use('/api/v1/tutors', tutorRoute);
app.use('/api/v1/reviews', reviewRoute);

app.listen(port, () => {
    connectDB();
    console.log(`Server is running at ${port}`);
});
