const StatementLines = require("../src/statementLines.js");

class Statement {
  constructor(transactions) {
    this.transactions = transactions;
  }

  print() {
    let firstLine = "date  ||  credit  ||  debit  ||  balance";
    const statementLines = new StatementLines(this.transactions);
    let printedStatement = firstLine + "\n" + statementLines.createLines();
    return printedStatement;
  }
}

module.exports = Statement;
