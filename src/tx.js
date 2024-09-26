class Transaction {
  constructor(credit, debit, date, balance) {
    this.credit = credit;
    this.debit = debit;
    this.date = date;
    this.balance = balance;
  }
}

module.exports = Transaction;
