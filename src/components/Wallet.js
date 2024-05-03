import React, { useState } from 'react';
import AddIncomeForm from './AddIncomeForm';
import { Button } from '@mui/material';

const Wallet = ({ walletBalance, addIncome }) => {
  const [showAddIncomeForm, setShowAddIncomeForm] = useState(false);

  const handleOpen = () => {
    setShowAddIncomeForm(true);
  };

  const handleClose = () => {
    setShowAddIncomeForm(false);
  };

  return (
    <div className="wallet-container">
      <div className="wallet-balance">
        <h2>Balance</h2>
        <p>${walletBalance}</p>
        <Button onClick={handleOpen}>+Add Balance</Button>
      </div>
      <AddIncomeForm addIncome={addIncome} open={showAddIncomeForm} onClose={handleClose} />
    </div>
  );
};

export default Wallet;
