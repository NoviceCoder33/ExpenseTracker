import React from 'react';
import { PieChart, Pie, Tooltip, Legend } from 'recharts';

const ExpensePieChart = ({ expenses }) => {
  // Checking if expenses is defined before accessing it
  if (!expenses || expenses.length === 0) {
    return <div>No expenses data available</div>;
  }
 
  console.log('Expenses data:', expenses);

  const categoryColors = {
    Food: '#9c27b0',   
    Travel: '#ffeb3b',    
    Entertainment: '#ff5722',  
  };

  // Calculate total expenses by category
  const expensesByCategory = expenses.reduce((acc, expense) => {
    const amount = parseFloat(expense.amount); // Convert amount to number
    if (acc[expense.category]) {
      acc[expense.category] += amount;
    } else {
      acc[expense.category] = amount;
    }
    return acc;
  }, {});

  // Prepare data for pie chart
  const data = Object.keys(expensesByCategory).map(category => ({
    name: category,
    value: expensesByCategory[category],
    fill: categoryColors[category] 
  }));

  return (
    <div>
      <PieChart width={400} height={300}>
        <Pie
          data={data}
          dataKey="value"
          nameKey="name"
          cx="50%"
          cy="50%"
          outerRadius={100}
          label={(entry) => `${(entry.percent * 100).toFixed(2)}%`} //Display percentage
        />
        <Tooltip />
        <Legend />
      </PieChart>
    </div>
  );
};

export default ExpensePieChart;
