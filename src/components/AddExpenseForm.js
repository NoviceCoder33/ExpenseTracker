import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, MenuItem } from '@mui/material';

const AddExpenseForm = ({ addExpense, onClose }) => {
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');
  const [date, setDate] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !amount || !category || !date) {
      return;
    }
    const expense = {
      id: Math.random().toString(),
      title,
      amount,
      category,
      date
    };
    addExpense(expense);
    setTitle('');
    setAmount('');
    setCategory('');
    setDate('');
    onClose(); // Close the dialog after submitting
  };

  return (
    <Dialog open={true} onClose={onClose}>
      <DialogTitle>Add Expenses</DialogTitle>
      <form onSubmit={handleSubmit}>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="title"
            label="Title"
            type="text"
            fullWidth
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          <TextField
            margin="dense"
            id="amount"
            label="Amount"
            type="number"
            fullWidth
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
          />
          <TextField
            select
            margin="dense"
            id="category"
            label="Category"
            fullWidth
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          >
            <MenuItem value="Entertainment">Entertainment</MenuItem>
            <MenuItem value="Food">Food</MenuItem>
            <MenuItem value="Travel">Travel</MenuItem>
          </TextField>
          <TextField
            margin="dense"
            id="date"
            type="date"
            fullWidth
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Cancel</Button>
          <Button type="submit">+Add Expense</Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default AddExpenseForm;
