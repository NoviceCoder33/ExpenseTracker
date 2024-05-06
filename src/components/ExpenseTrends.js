import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const ExpenseTrends = ({ expenses }) => {
  if (!expenses || expenses.length === 0) {
    return <div>No expenses data available</div>;
  }

  const expensesByCategory = expenses.reduce((acc, expense) => {
    const amount = parseFloat(expense.amount); // Convert amount to number
    if (acc[expense.category]) {
      acc[expense.category] += amount;
    } else {
      acc[expense.category] = amount;
    }
    return acc;
  }, {});

  const data = Object.keys(expensesByCategory).map(category => ({
    category,
    amount: expensesByCategory[category],
  }));

  return (
    <div>
      <h2>Expense Trends</h2>
      <BarChart width={400} height={300} data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="category" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="amount" fill="#8884d8" />
      </BarChart>
    </div>
  );
};

export default ExpenseTrends;
