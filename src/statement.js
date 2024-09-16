class Statement {
  print(transactions) {
    let transactionList = `date || credit || debit || balance\n`;

    for (const transaction of transactions) {
      transactionList += `${transaction.date} ||`;
      transactionList += ` ${transaction.credit} ||`;
      transactionList += ` ${transaction.debit} ||`;
      transactionList += ` ${transaction.balance}\n`;
    }
    return transactionList;
  }
}

module.exports = Statement;
