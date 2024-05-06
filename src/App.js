import React, { useState, useEffect } from 'react';
import './App.css';
import ExpenseSummary from './components/ExpenseSummary';
import Wallet from './components/Wallet';
import ExpensePieChart from './components/ExpensePieChart';
import RecentTransactions from './components/RecentTransactions';
import ExpenseTrends from './components/ExpenseTrends';

function App() {
  const [expenses, setExpenses] = useState([]);
  const [walletBalance, setWalletBalance] = useState(5000);
  const [totalExpensesAmount, setTotalExpensesAmount] = useState(0);

  useEffect(() => {
    const savedExpenses = JSON.parse(localStorage.getItem('expenses'));
    if (savedExpenses) {
      setExpenses(savedExpenses);
      // Calculate total expenses amount when expenses are loaded from localStorage
      const amount = savedExpenses.reduce((total, expense) => total + parseFloat(expense.amount), 0);
      setTotalExpensesAmount(amount);
    }
  }, []);

  const addIncome = (amount) => {
    setWalletBalance(walletBalance + amount);
  };

  const addExpense = (expense) => {
    const newExpenses = [...expenses, expense];
    setExpenses(newExpenses);
    // Calculate total expenses amount when a new expense is added
    const amount = newExpenses.reduce((total, expense) => total + parseFloat(expense.amount), 0);
    setTotalExpensesAmount(amount);
    localStorage.setItem('expenses', JSON.stringify(newExpenses));
  };

  const deleteExpense = (id) => {
    const updatedExpenses = expenses.filter((expense) => expense.id !== id);
    setExpenses(updatedExpenses);

    // Calculate total expenses amount after deleting an expense
    const amount = updatedExpenses.reduce((total, expense) => total + parseFloat(expense.amount), 0);
    setTotalExpensesAmount(amount);
    localStorage.setItem('expenses', JSON.stringify(updatedExpenses));
  };

  const editExpense = (id, updatedExpense) => {
    const updatedExpenses = expenses.map((expense) =>
      expense.id === id ? { ...expense, ...updatedExpense } : expense
    );
    setExpenses(updatedExpenses);

    // Calculate total expenses amount after editing an expense
    const amount = updatedExpenses.reduce((total, expense) => total + parseFloat(expense.amount), 0);
    setTotalExpensesAmount(amount);
    localStorage.setItem('expenses', JSON.stringify(updatedExpenses));
  };
  return (
    <div className="App">
      <h1>Expense Tracker</h1>
      <div>
        <Wallet walletBalance={walletBalance} addIncome={addIncome} />
        <ExpenseSummary
          expenses={expenses}
          addExpense={addExpense}
          totalExpensesAmount={totalExpensesAmount}
        />
        <ExpensePieChart expenses={expenses} />
      </div>
      <div>
        <RecentTransactions  
          expenses={expenses}
          editExpense={editExpense}
          deleteExpense={deleteExpense}
          />
        <ExpenseTrends/>
      </div>
    </div>
  );
}

export default App;
