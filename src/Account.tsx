// src/Account.tsx

import React, { FormEvent, useState } from 'react';
import Statement from './Statement';

type TransactionType = 'deposit' | 'withdrawal';

interface TransactionProps {
  date: string;
  amount: number;
  type: TransactionType;
}

const Account: React.FC = () => {
  const [balance, setBalance] = useState(0.00);
  const [transactions, setTransactions] = useState<TransactionProps[]>([]);
  const [depositValue, setDepositValue] = useState("")
  const [withdrawValue, setWithdrawValue] = useState("")


  const deposit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const amount = parseFloat(depositValue)
    const date = new Date().toLocaleDateString();
    setBalance((prevBalance) => prevBalance + amount);
    setTransactions([...transactions, { date, amount, type: 'deposit' }]);
    setDepositValue("");
  };

  const withdraw = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const amount = parseFloat(withdrawValue)
    const date = new Date().toLocaleDateString();
    if (balance >= amount) {
      setBalance((prevBalance) => prevBalance - amount);
      setTransactions([...transactions, { date, amount, type: 'withdrawal' }]);
    } else {
      alert('Insufficient funds.');
    }
    setWithdrawValue("")
  };


  return (
    <div>
      <h2>Bank Account</h2>
      <p>Balance: ${balance.toFixed(2)}</p>
      <div className="container">
        <form className="input-group" onSubmit={deposit}>
          <input
            type="text"
            className="form-control"
            value={depositValue}
            onChange={(e) => setDepositValue(e.target.value)}
            pattern="^\d+(\.\d{1,2})?$"
            title="Please enter a valid amount." />
          <button className="btn btn-primary" type='submit'>Deposit</button>
        </form>
      </div>
      <div className="container mt-5">
        <form className="input-group" onSubmit={withdraw}>
          <input
            type="text"
            className="form-control"
            value={withdrawValue}
            onChange={(e) => setWithdrawValue(e.target.value)}
            pattern="^\d+(\.\d{1,2})?$"
            title="Please enter a valid amount." />
          <button className="btn btn-primary" type='submit'>Withdraw</button>
        </form>
      </div>

      <button className='btn btn-primary mt-5' data-bs-toggle="modal" data-bs-target="#statementModal">Generate Statement</button>
      <div className="modal fade" id='statementModal' tabIndex={-1} aria-labelledby='statementModalLabel' aria-hidden="true">
        <Statement transactions={transactions} />
      </div>
    
    </div>
  );
};

export default Account;
