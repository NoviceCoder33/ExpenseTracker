import React, { useState } from 'react';
import AddExpenseForm from './AddExpenseForm';
import { Button } from '@mui/material';
import './ExpenseSummary.css';

const ExpenseSummary = ({ expenses, addExpense, totalExpensesAmount }) => {
  const [showForm, setShowForm] = useState(false);

  const toggleForm = () => {
    setShowForm(!showForm);
  };

  return (
    <div className="expense-container">
      <p  style={{color:"#fff",fontWeight:"600"}}
      >Expenses: <span className="redword"> ${totalExpensesAmount}</span>
      </p>
      <Button className="redbtn" onClick={toggleForm}>+add Expense</Button>
      {showForm && <AddExpenseForm addExpense={addExpense} onClose={toggleForm} />}
    </div>
  );
};

export default ExpenseSummary;
