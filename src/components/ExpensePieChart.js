import React from 'react';
import { PieChart, Pie, ResponsiveContainer, Cell, Tooltip, Legend } from 'recharts';

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
  const data = Object.keys(expensesByCategory).map((category) => ({
    name: category,
    value: expensesByCategory[category],
    fill: categoryColors[category],
  }));

  return (
    <div style={{ width: '100%', height: 250 }}>
      <ResponsiveContainer>
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            labelLine={false}
            outerRadius={100}
            label={({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
              const RADIAN = Math.PI / 180;
              const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
              const x = cx + radius * Math.cos(-midAngle * RADIAN);
              const y = cy + radius * Math.sin(-midAngle * RADIAN);
              return (
                <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
                  {`${(percent * 100).toFixed(2)}%`}
                </text>
              );
            }}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.fill} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ExpensePieChart;
