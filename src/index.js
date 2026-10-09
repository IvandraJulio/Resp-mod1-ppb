import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import loansRouter from './routes/loans.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Base route – health check
app.get('/', (req, res) => {
  res.json({
    status: 'OK',
    message: 'Library Loans API is running',
    endpoints: {
      getAllLoans: 'GET /api/loans',
      filterLoansByStatus: 'GET /api/loans?status=Terlambat',
      getLoanById: 'GET /api/loans/:id',
      createLoan: 'POST /api/loans',
      updateLoan: 'PATCH /api/loans/:id',
      deleteLoan: 'DELETE /api/loans/:id'
    }
  });
});

app.use('/api/loans', loansRouter);

if (process.env.NODE_ENV !== 'production' && !process.env.VERCEL) {
  app.listen(PORT, () => {
    console.log(`🚀 Server listening at http://localhost:${PORT}`);
  });
}

export default app;
