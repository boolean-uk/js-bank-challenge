class StatementLines {
  constructor(transactions) {
    this.transactions = transactions;
  }

  createLines() {
    let lines = "";
    for (let i = 0; i < this.transactions.length; i++) {
      let currentTr = this.transactions[i];
      let date = currentTr.date;
      let amount = currentTr.amount;
      let type = currentTr.type;
      let balance = currentTr.balance;
      lines +=
        date + "  ||  " + amount + "  ||  " + type + "  ||  " + balance + "\n";
    }

    return lines;
  }
}

module.exports = StatementLines;
