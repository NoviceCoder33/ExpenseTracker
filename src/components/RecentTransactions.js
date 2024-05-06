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
    <div>
    <h2 style={{color:"#fff"}}>Recent Transactions</h2>
    <div className="recent-transactions-container">
      <ul>
        {currentTransactions && currentTransactions.map(expense => (
          <li key={expense.id}>
            {editingExpenseId === expense.id ? (
              <div className="recent-transactions">
                <div className="title-expense">
                <input
                  type="text"
                  value={editedExpense.title}
                  onChange={(e) => handleInputChange(e, 'title')}
                  placeholder="Title"
                />
                <input
                  type="date"
                  value={editedExpense.date}
                  onChange={(e) => handleInputChange(e, 'date')}
                  placeholder="Date"
                />
                </div>
                <div className="detail-expense">
                <input
                  type="number"
                  value={editedExpense.amount}
                  onChange={(e) => handleInputChange(e, 'amount')}
                  placeholder="Amount"
                />
                <button onClick={handleSaveEdit}>
                    <FontAwesomeIcon icon={faCheck} />
                </button>
                <button onClick={handleCancelEdit}>
                    <FontAwesomeIcon icon={faTimes} />
                </button>
                </div>

              </div>
            ) : (
              <div className="recent-transactions">
                <div className="title-expense">
                <span>{expense.title}</span>
                <span style={{color:"grey"}}>{expense.date}</span>
                </div>
                <div className="detail-expense">
                <span  style={{color:"#F4BB4A"}}>${expense.amount}</span>
                <FontAwesomeIcon style={{color:"#FF3E3E"}} icon={DeleteIcon} onClick={() => onDeleteExpense(expense.id)} />
                <FontAwesomeIcon style={{color:"#F4BB4A"}}  icon={EditIcon} onClick={() => handleEdit(expense)} />
                </div>
              </div>
            )}
          </li>
        ))}
      </ul>
      
      <div className="pagination">
      <button onClick={prevPage} disabled={currentPage === 1}>
      <FontAwesomeIcon icon={faChevronLeft} />
      </button>
      <span style={{backgroundColor:"#43967B",borderRadius:"1rem"}}>  {currentPage}  </span>
      <button onClick={nextPage} disabled={currentTransactions.length < transactionsPerPage}>
      <FontAwesomeIcon icon={faChevronRight} />
      </button>
      </div>
    </div>
    </div>
  );
};

export default RecentTransactions;
