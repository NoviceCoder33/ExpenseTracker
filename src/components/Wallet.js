import React, { useState } from 'react';
import AddIncomeForm from './AddIncomeForm';
import { Button } from '@mui/material';
import './Wallet.css';

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
        <p style={{color:"#fff",fontWeight:"600"}}>Wallet Balance:<span className="greenword"> ${walletBalance}</span>
        </p>
        <Button className="greenbtn"  onClick={handleOpen}>+add Balance</Button>
      </div>
      <AddIncomeForm addIncome={addIncome} open={showAddIncomeForm} onClose={handleClose} />
    </div>
  );
};

export default Wallet;
