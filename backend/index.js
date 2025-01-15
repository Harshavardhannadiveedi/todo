import express from 'express';
import connectToMongoDB from './src/config/db.js';
import dotenv from 'dotenv';
import cors from 'cors';
import router from './src/routes/user.route.js';

dotenv.config();

connectToMongoDB();

const app = express();
const port = process.env.PORT || 3000;
const corsOptions = {
    origin: 'http://localhost:5173', // Replace with your frontend domain
};
  
app.use(cors(corsOptions));
  

// Parse JSON request bodies
app.use(express.json());

// Use router for API routes
app.use('/api', router);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
