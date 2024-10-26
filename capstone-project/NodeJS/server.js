import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import userRoutes from './routes/userRoutes.js';
import channelRoutes from './routes/channelRoutes.js';
import videoRoutes from './routes/videoRoutes.js';

const app = express();

//Middleware
app.use(cors());


app.use(express.json());

// MongoDB connection 
mongoose.connect("mongodb://localhost:27017/YouTube-data", { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("MongoDB connected"))
    .catch(err => console.log("MongoDB connection error:", err));



app.use('/api/users', userRoutes);
app.use('/api/channels', channelRoutes); 
app.use('/api/videos', videoRoutes);

// Start server
const PORT = 8000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});