import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from 'recharts';

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
    <div className="expense-trend-container">
      <h2 style={{color:"#fff"}}>Expense Trends</h2>
      <BarChart width={550} height={300} data={data} layout="vertical">
        <XAxis type="number" />
        <YAxis dataKey="category" type="category" width={150} />
        <Tooltip />
        <Legend />
        <Bar dataKey="amount" fill="#8884d8"  barSize={10}/>
      </BarChart>
    </div>
  );
};

export default ExpenseTrends;
