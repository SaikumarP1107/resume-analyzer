const functions = require('firebase-functions');
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();
import scoreRouter from './routes/score.route';

dotenv.config();

const app = express();
const PORT = 4000;

app.use(cors());
app.use(express.json());

app.use('/score', scoreRouter);

app.listen(PORT, () => {
  console.log(`API server running at http://localhost:${PORT}`);
});

exports.app = functions.https.onRequest(app);