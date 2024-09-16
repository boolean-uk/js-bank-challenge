class Statement {
  constructor(transaction) {
    this.transactions = transaction;
  }

  print() {
    let statement = `date       || credit    || debit     || balance\n`;
    for (const transaction of this.transactions.reverse()) {
      const [date, amount, type, balance] = [
        transaction.date,
        transaction.amount.toFixed(2),
        transaction.type,
        transaction.balance.toFixed(2),
      ];

      type === "credit"
        ? (statement += `${date} || ${amount} || || ${balance}\n`)
        : (statement += `${date} || || ${amount} || ${balance}\n`);
    }

    return statement;
  }
}

module.exports = Statement;
