const Statement = require("./statement.js");

class BankAccount {
  constructor() {
    this.balance = 0;
    this.transactionHistory = [];
  }

  deposit(amount, date) {
    this.balance += amount;

    const transaction = {
      date: date,
      amount: amount,
      type: "credit",
      balance: this.balance,
    };

    this.transactionHistory.push(transaction);
  }

  withdraw(amount, date) {
    this.balance -= amount;

    const transaction = {
      date: date,
      amount: amount,
      type: "debit",
      balance: this.balance,
    };

    this.transactionHistory.push(transaction);
  }

  get History() {
    return this.transactionHistory;
  }

  printStatement() {
    const statement = new Statement(this.transactionHistory);
    return statement.print();
  }
}

module.exports = BankAccount;
