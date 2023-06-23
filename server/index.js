import express from 'express';
import * as dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './mongodb/connect.js';
import postRoutes from './routes/postRoutes.js';
import dalleRoutes from './routes/dalleRoutes.js';
// config .env
dotenv.config();

// init express
const app = express();

// middlewares
app.use(cors());
app.use(express.json({ limit: '50mb' }));

// middleware routes
app.use('/api/v1/post', postRoutes);
app.use('/api/v1/dalle', dalleRoutes);
// routes
app.get('/', async (req, res) => {
    res.status(200).json({
    message: 'Hello from DALL.E!',
    });
});

// start server
const startServer = async () => {
    try {
    connectDB(process.env.MONGODB_URL);
    app.listen(8080, () => console.log('Server started on port 8080'));
    } catch (error) {
    console.log(error);
    }
};

// connect to db
startServer();