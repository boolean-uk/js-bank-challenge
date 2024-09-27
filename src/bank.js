const Statement = require("./statement.js");
const Transaction = require("./transaction.js");

class Bank {
  constructor() {
    this.transactions = [];
    this.accountBalance = 0;
  }

  deposit(amount, date) {
    if (!amount || amount <= 0) throw new Error("Amount not valid");
    if (!date) throw new Error("Date not valid");
    this.accountBalance += amount;
    const newTransaction = new Transaction(
      date,
      amount,
      "credit",
      this.accountBalance
    );
    this.transactions.push(newTransaction);
  }

  withdraw(amount, date) {
    if (this.accountBalance - amount < 0) {
      return "INSUFFICIENT FUNDS";
    }
    this.accountBalance -= amount;
    const newTransaction = new Transaction(
      date,
      amount,
      "debit",
      this.accountBalance
    );
    this.transactions.push(newTransaction);
  }

  statement() {
    let statement = new Statement(this.transactions);
    return statement.print();
  }
}

module.exports = Bank;
