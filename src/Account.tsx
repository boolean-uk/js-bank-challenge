// src/Account.tsx

import React, { FormEvent, useEffect, useState } from 'react';
import Statement from './Statement';

type TransactionType = 'deposit' | 'withdrawal';

interface TransactionProps {
  date: Date;
  amount: number;
  type: TransactionType;
}

const Account: React.FC = () => {
  const currentDate = new Date();
  const oneYearAgo = new Date();
  oneYearAgo.setFullYear(currentDate.getFullYear() - 1);

  const [balance, setBalance] = useState(0.00);
  const [transactions, setTransactions] = useState<TransactionProps[]>([]);
  const [transactionForStatement , setTransactionForStatement] = useState<TransactionProps[]>([]);
  const [depositValue, setDepositValue] = useState("")
  const [withdrawValue, setWithdrawValue] = useState("")
  const [overdraftActive, setOverdraftActive] = useState(false)
  const [startDate,setStartDate] = useState(oneYearAgo)
  const [endDate,setEndDate] = useState(currentDate)

  const OVERDRAFT = 500.00

  useEffect(() => {
    const currentBalance = transactions.map(transaction => transaction.type === 'deposit' ? transaction.amount : -transaction.amount).reduce((x,y)=>x+y,0)
    setBalance(currentBalance)
  },[transactions])

  const deposit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const amount = parseFloat(depositValue)
    const date = new Date();
    setTransactions([...transactions, { date, amount, type: 'deposit' }]);
    setDepositValue("");
  };

  const withdraw = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const amount = parseFloat(withdrawValue)
    const date = new Date();
    const available = overdraftActive ? balance + OVERDRAFT : balance
    if (available >= amount) {
      setTransactions([...transactions, { date, amount, type: 'withdrawal' }]);
    } else {
      alert('Insufficient funds.');
    }
    setWithdrawValue("")
  };

  const submitStatement = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const endDateFullDay = new Date(endDate)
    endDateFullDay.setDate(endDateFullDay.getDate() + 1)

    const filteredTransactions = transactions.filter((transaction) => {
      const transactionDate = new Date(transaction.date).getTime();
      const startDateTimestamp = new Date(startDate).getTime();
      const endDateTimestamp = endDateFullDay.getTime();
      return transactionDate >= startDateTimestamp && transactionDate <= endDateTimestamp;
    });
    setTransactionForStatement(filteredTransactions)
  }

  const isDisabled = () => {
    if (overdraftActive) return parseFloat(withdrawValue) > balance + OVERDRAFT;
    else return parseFloat(withdrawValue) > balance
  }


  return (
    <div>
      <h2>Bank Account</h2>
      <p>Balance: ${balance.toFixed(2)}</p>
      <div className="container">
        <form className="input-group" onSubmit={deposit}>
          <input
            data-testid="deposit"
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
            data-testid="withdraw"
            type="text"
            className="form-control"
            value={withdrawValue}
            onChange={(e) => setWithdrawValue(e.target.value)}
            pattern="^\d+(\.\d{1,2})?$"
            title="Please enter a valid amount." />
          <button className="btn btn-success" type='submit' disabled={isDisabled()}>Withdraw</button>
        </form>
      </div>
      <div className="container mt-3">
        <form className="input-group" onSubmit={submitStatement}>
          <div className='container d-flex'>
            <input
              data-testid="start-date"
              type="date"
              className="form-control"
              value={startDate.toISOString().slice(0, 10)}
              onChange={(e) => setStartDate(new Date(e.target.value))}
            />
            <input
              data-testid="end-date"
              type="date"
              className="form-control"
              value={endDate.toISOString().slice(0, 10)}
              onChange={(e) => setEndDate(new Date(e.target.value))}
            />
          </div>

         <button className='btn btn-primary mt-5' data-bs-toggle="modal" data-bs-target="#statementModal">Generate Statement</button>

        </form>
      </div>

      <div className="modal fade" id='statementModal' tabIndex={-1} aria-labelledby='statementModalLabel' aria-hidden="true">
        <Statement transactions={transactionForStatement} />
      </div>
      <div>
      <button className="btn btn-primary mt-5" onClick={() => setOverdraftActive((prev)=>!prev)}>{overdraftActive ? "Disable Overdraft" : "Allow overdraft(500$)"}</button>
      </div>

    
    </div>
  );
};

export default Account;
