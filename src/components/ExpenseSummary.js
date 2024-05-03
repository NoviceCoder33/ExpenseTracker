import React, { useState } from 'react';
import AddExpenseForm from './AddExpenseForm';
import { Button } from '@mui/material';

const ExpenseSummary = ({ expenses, addExpense, totalExpensesAmount }) => {
  const [showForm, setShowForm] = useState(false);

  const toggleForm = () => {
    setShowForm(!showForm);
  };

  return (
    <div>
      <h2>Expense</h2>
      <p>Total Expenses: ${totalExpensesAmount}</p>
      <Button onClick={toggleForm}>+Add Expense</Button>
      {showForm && <AddExpenseForm addExpense={addExpense} onClose={toggleForm} />}
    </div>
  );
};

export default ExpenseSummary;
