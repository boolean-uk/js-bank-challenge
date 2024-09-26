const BankAccount = require("../src/bankAccount.js");

class Printer {
  constructor(transactions) {
    this.transactions = transactions;
  }

  printStatement() {
    const rows = [];
    rows.push(`    Date   || Credit  || Debit || Balance`);
    for (const row of this.transactions) {
      rows.push(
        `${row.date} ||    ${row.credit} ||     ${row.debit} || ${row.balance}`
      );
    }
    return rows.join("\n");
  }
}

module.exports = Printer;

const bankAccount = new BankAccount();

bankAccount.depositFunds(2000, "13/12/2012");
bankAccount.depositFunds(1000, "14/12/2012");
bankAccount.withdrawFunds(500, "15/12/2012");

const printer = new Printer(bankAccount.transactionsArray);

console.log(printer.printStatement());
