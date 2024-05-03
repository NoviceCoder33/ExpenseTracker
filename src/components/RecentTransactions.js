import React, { useState } from 'react';
import './RecentTransactions.css';

const RecentTransactions = ({ expenses, onDeleteExpense, onEditExpense }) => {
  const [editingExpenseId, setEditingExpenseId] = useState(null);
  const [editedExpense, setEditedExpense] = useState({
    title: '',
    amount: '',
    category: '',
    date: ''
  });

  const categories = ['Food', 'Entertainment', 'Travel'];

  const handleEdit = (expense) => {
    setEditingExpenseId(expense.id);
    setEditedExpense({
      title: expense.title,
      amount: expense.amount,
      category: expense.category,
      date: expense.date
    });
  };

  const handleSaveEdit = () => {
    const updatedExpense = {
      ...editedExpense,
      amount: parseFloat(editedExpense.amount)
    };
    onEditExpense(editingExpenseId, updatedExpense);
    setEditingExpenseId(null);
    setEditedExpense({
      title: '',
      amount: '',
      category: '',
      date: ''
    });
  };

  const handleCancelEdit = () => {
    setEditingExpenseId(null);
    setEditedExpense({
      title: '',
      amount: '',
      category: '',
      date: ''
    });
  };

  return (
    <div className="recent-transactions-container">
      <h2>Recent Transactions</h2>
      <ul>
        {expenses.map(expense => (
          <li key={expense.id}>
            {editingExpenseId === expense.id ? (
              <div>
                <input
                  type="text"
                  value={editedExpense.title}
                  onChange={(e) => setEditedExpense({ ...editedExpense, title: e.target.value })}
                  placeholder="Title"
                />
                <input
                  type="number"
                  value={editedExpense.amount}
                  onChange={(e) => setEditedExpense({ ...editedExpense, amount: e.target.value })}
                  placeholder="Amount"
                />
                <select
                  value={editedExpense.category}
                  onChange={(e) => setEditedExpense({ ...editedExpense, category: e.target.value })}
                >
                  <option value="">Select category</option>
                  {categories.map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
                <input
                  type="date"
                  value={editedExpense.date}
                  onChange={(e) => setEditedExpense({ ...editedExpense, date: e.target.value })}
                  placeholder="Date"
                />
                <button onClick={handleSaveEdit}>Save</button>
                <button onClick={handleCancelEdit}>Cancel</button>
              </div>
            ) : (
              <div>
                <span>{expense.title}</span>
                <span>${expense.amount}</span>
                <span>{expense.category}</span>
                <span>{expense.date}</span>
                <button onClick={() => onDeleteExpense(expense.id)}>Delete</button>
                <button onClick={() => handleEdit(expense)}>Edit</button>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RecentTransactions;
