import React, { useState } from 'react';
import './RecentTransactions.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt as DeleteIcon, faEdit as EditIcon,faCheck, faTimes,faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';

const RecentTransactions = ({ expenses, onDeleteExpense, onEditExpense }) => {
  const [editingExpenseId, setEditingExpenseId] = useState(null);
  const [editedExpense, setEditedExpense] = useState({
    title: '',
    amount: '',
    category: '',
    date: ''
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [transactionsPerPage] = useState(5);

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

  const handleInputChange = (e, field) => {
    setEditedExpense({ ...editedExpense, [field]: e.target.value });
  };

  // Logic for pagination
  const indexOfLastTransaction = currentPage * transactionsPerPage;
  const indexOfFirstTransaction = indexOfLastTransaction - transactionsPerPage;
  const currentTransactions = expenses && expenses.slice(indexOfFirstTransaction, indexOfLastTransaction);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const nextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const prevPage = () => {
    setCurrentPage(currentPage - 1);
  };

  return (
    <div className="recent-transactions-container">
      <h2>Recent Transactions</h2>
      <ul>
        {currentTransactions && currentTransactions.map(expense => (
          <li key={expense.id}>
            {editingExpenseId === expense.id ? (
              <div>
                <input
                  type="text"
                  value={editedExpense.title}
                  onChange={(e) => handleInputChange(e, 'title')}
                  placeholder="Title"
                />
                <input
                  type="number"
                  value={editedExpense.amount}
                  onChange={(e) => handleInputChange(e, 'amount')}
                  placeholder="Amount"
                />
                <select
                  value={editedExpense.category}
                  onChange={(e) => handleInputChange(e, 'category')}
                >
                  <option value="">Select category</option>
                  {categories.map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
                <input
                  type="date"
                  value={editedExpense.date}
                  onChange={(e) => handleInputChange(e, 'date')}
                  placeholder="Date"
                />
                <button onClick={handleSaveEdit}>
                    <FontAwesomeIcon icon={faCheck} />
                </button>
                <button onClick={handleCancelEdit}>
                    <FontAwesomeIcon icon={faTimes} />
                </button>
              </div>
            ) : (
              <div>
                <span>{expense.title}</span>
                <span>${expense.amount}</span>
                <span>{expense.category}</span>
                <span>{expense.date}</span>
                <FontAwesomeIcon icon={DeleteIcon} onClick={() => onDeleteExpense(expense.id)} />
                <FontAwesomeIcon icon={EditIcon} onClick={() => handleEdit(expense)} />
              </div>
            )}
          </li>
        ))}
      </ul>
      
      <div className="pagination">
      <button onClick={prevPage} disabled={currentPage === 1}>
      <FontAwesomeIcon icon={faChevronLeft} />
      </button>
      <span>  {currentPage}  </span>
      <button onClick={nextPage} disabled={currentTransactions.length < transactionsPerPage}>
      <FontAwesomeIcon icon={faChevronRight} />
      </button>
      </div>
    </div>
  );
};

export default RecentTransactions;
