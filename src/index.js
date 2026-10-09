import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import loansRouter from './routes/loans.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.json({ status: 'OK', message: 'Library Loans API is running' });
});

app.use('/api/loans', loansRouter);

app.listen(PORT, () => {
  console.log(`🚀 Server listening at http://localhost:${PORT}`);
});
