class Transaction {
  constructor(balance = 0) {
    this.balance = balance;
    this.statement = "date || credit || debit || balance";
  }
  deposit(amount, date) {
    this.balance += amount;
    this.statement += `\n${date} ${amount} ${this.balance}`;
  }
  withdraw(amount, date) {
    this.balance -= amount;
    this.statement += `\n${date} ${amount} ${this.balance}`;
  }
  printStatement() {
    return this.statement;
  }
}

module.exports = { Transaction };
