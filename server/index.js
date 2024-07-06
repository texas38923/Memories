import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import path from 'path';

import postRoutes from './routes/posts.js';
import userRoutes from './routes/user.js';

import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const app = express();
dotenv.config();

//for the images to be sent:
app.use(bodyParser.json({ limit: '30mb', extended: true }));
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }));
app.use(cors());

//for deployment:
const __dirname = path.resolve();
app.get('/', (req, res) => {
  app.use(express.static(path.resolve(__dirname, 'client', 'build')));
  res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
});

//middlewares to be used:
app.use('/posts', postRoutes);
app.use('/user', userRoutes);

const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.CONNECTION_URL)
  .then(() =>
    app.listen(PORT, () => console.log(`Server running on port : ${PORT}`))
  )
  .catch((error) => console.log(error.message));
