class Transaction {
  constructor(date, amount, type, balance) {
    this.date = date;
    this.amount = amount;
    this.type = type;
    this.balance = balance;
  }

  createTransaction() {
    const newTransaction = {
      date: this.date,
      amount: this.amount,
      type: this.type,
      balance: this.balance,
    };
    return newTransaction;
  }
}

module.exports = Transaction;
