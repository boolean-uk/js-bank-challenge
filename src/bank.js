const Statement = require("./statement.js");

class Bank {
  constructor() {
    this.balance = 2000;
    this.transactions = [];
    this.statement = new Statement();
  }

  deposit(amount, date) {
    if (!amount || amount <= 0) throw new Error("Amount not valid");
    if (!date) throw new Error("Date not valid");

    const transaction = {
      date: date.replace(/-/g, "/"),
      credit: "   ",
      debit: amount.toFixed(2),
      balance: (this.balance += amount).toFixed(2),
    };

    this.transactions.push(transaction);

    return `You have deposited £${amount.toFixed(2)}`;
  }

  withdrawal(amount, date) {
    if (!amount) throw new Error("Amount not valid");
    if (amount > this.balance)
      throw new Error("Amount bigger than current balance");
    if (!date) throw new Error("Date not valid");

    const transaction = {
      date: date.replace(/-/g, "/"),
      credit: amount.toFixed(2),
      debit: "  ",
      balance: (this.balance -= amount).toFixed(2),
    };

    this.transactions.push(transaction);

    return `You have withdrawed £${amount.toFixed(2)}`;
  }

  print() {
    return this.statement.print(this.transactions);
  }
}

module.exports = Bank;
