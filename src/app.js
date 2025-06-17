
import express from 'express';
import userRouter from './routes/userRoutes.js';
import path from 'path';
import fs from 'fs';
import cors from 'cors';

const app = express();
const __dirname = path.resolve();

// Auto-create uploads folder if it doesn't exist
const uploadDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
}

// Middleware
app.use(cors({
    origin: ["http://localhost:5173", "https://yourfrontenddomain.com"],
    credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static(uploadDir));

// Routes
app.get('/', (req, res) => res.send('<h1>Hello World from Auth App.</h1>'));
app.use('/api/users', userRouter);

export default app;
