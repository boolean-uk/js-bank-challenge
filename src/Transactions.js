const Transaction = require("./Transaction");
const Statement = require("./Statement");
class Transactions {
  constructor(balance = 0) {
    this.balance = balance;
    this.listOfTransactions = [];
  }

  newTransaction(valueOfTransaction) {
    const transaction = new Transaction(valueOfTransaction, this.balance);
    const completedTransaction = transaction.handleTransaction();
    this.listOfTransactions.push(completedTransaction);
    this.balance = this.balance + valueOfTransaction;
  }

  printStatement() {
    const statement = new Statement(this.listOfTransactions);
    return statement.printStatement();
  }
}

module.exports = Transactions;
