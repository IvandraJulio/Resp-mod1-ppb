import { Router } from 'express';
import { supabase } from '../db/supabaseClient.js';
import { v4 as uuidv4 } from 'uuid';

const router = Router();

const mapLoan = (row) => ({
  id: row.id,
  member_id: row.member_id,
  book_id: row.book_id,
  loan_date: row.loan_date,
  due_date: row.due_date,
  return_date: row.return_date,
  status: row.status,
});

// CREATE a loan
router.post('/', async (req, res) => {
  const { member_id, book_id, loan_date, due_date } = req.body;
  if (!member_id || !book_id) {
    return res.status(400).json({ error: 'member_id & book_id are required' });
  }
  const newLoan = {
    id: uuidv4(),
    member_id,
    book_id,
    loan_date: loan_date ?? new Date().toISOString(),
    due_date,
    status: 'Ongoing',
  };
  const { data, error } = await supabase.from('loans').insert(newLoan).single();
  if (error) return res.status(500).json({ error: 'Failed to create loan' });
  res.status(201).json(mapLoan(data));
});

// LIST loans with optional filters
router.get('/', async (req, res) => {
  const { status, member_id, book_id } = req.query;
  let query = supabase.from('loans').select('*');
  if (status) query = query.eq('status', status);
  if (member_id) query = query.eq('member_id', member_id);
  if (book_id) query = query.eq('book_id', book_id);
  const { data, error } = await query.order('loan_date', { ascending: false });
  if (error) return res.status(500).json({ error: 'Failed to fetch loans' });
  res.json(data.map(mapLoan));
});

// GET single loan
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  const { data, error } = await supabase.from('loans')
    .select('*')
    .eq('id', id)
    .single();
  if (error) return res.status(404).json({ error: 'Loan not found' });
  res.json(mapLoan(data));
});

// UPDATE (partial)
router.patch('/:id', async (req, res) => {
  const { id } = req.params;
  const updates = req.body;
  const { data, error } = await supabase.from('loans')
    .update(updates)
    .eq('id', id)
    .single();
  if (error) return res.status(400).json({ error: 'Failed to update loan' });
  res.json(mapLoan(data));
});

// DELETE loan
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  const { error } = await supabase.from('loans').delete().eq('id', id);
  if (error) return res.status(400).json({ error: 'Failed to delete loan' });
  res.status(204).send();
});

export default router;
