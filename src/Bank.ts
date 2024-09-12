import * as fs from 'fs';
const PDFDocument = require('pdfkit');

export enum TransactionType {
  DEPOSIT = "DEPOSIT",
  WITHDRAWAL = "WITHDRAWAL",
}

interface Transaction {
  type: TransactionType;
  amount: number;
  date: Date;
}

export class Bank {
  private transactions: Transaction[] = [];

  public deposit(amount: number, date: Date): boolean {
    if (amount <= 0) return false;

    const transaction: Transaction = {
        type: TransactionType.DEPOSIT,
        amount,
        date,
      };

      this.transactions.push(transaction);
      return true;
  }

  public withdraw(amount: number, date: Date): boolean {
    if (amount <= 0) return false;

    // Calculate the available funds by considering all transactions
  let availableFunds = 0;
  for (const transaction of this.transactions) {
    if (transaction.type === TransactionType.DEPOSIT) {
      availableFunds += transaction.amount;
    } else {
      availableFunds -= transaction.amount;
    }
  }

  if (amount > availableFunds) return false;


    const transaction: Transaction = {
        type: TransactionType.WITHDRAWAL,
        amount,
        date,
      };

      this.transactions.push(transaction);
      return true;
  }

  public showAccountHistory(): string {
    let result = "date        || credit    || debit     || balance\n";
    let balance = 0;
    for (const transaction of this.transactions) {
      const { date, amount, type } = transaction;
      const formattedDate = date.toLocaleDateString().padEnd(12);
      const formattedAmount = amount.toFixed(2).padStart(8);

      if (type === TransactionType.DEPOSIT) {
        balance += amount;
        result += `${formattedDate}|| ${formattedAmount}  ||           || ${balance.toFixed(2)}\n`;
      } else {
        balance -= amount;
        result += `${formattedDate}||           || ${formattedAmount}  || ${balance.toFixed(2)}\n`;
      }
    }

    return result;
 }

 public showAccountHistoryBetweenTwoDates(date1: Date, date2: Date): string {
  if (date1 > date2) return "Wrong dates";

  const sortedTransactions = this.transactions.sort((a, b) => a.date.getTime() - b.date.getTime());
  const transactionsBetweenTwoDates: Transaction[] = [];

  for (const transaction of sortedTransactions) {
    if (transaction.date >= date1 && transaction.date <= date2) {
      transactionsBetweenTwoDates.push(transaction);
    }
  }

  let balance = 0;
  const transactionsBeforeStartDate = sortedTransactions.filter((transaction) => transaction.date < date1);
  for (const transaction of transactionsBeforeStartDate) {
    if (transaction.type === TransactionType.DEPOSIT) {
      balance += transaction.amount;
    } else {
      balance -= transaction.amount;
    }
  }
  return this.returnAccountHistory(transactionsBetweenTwoDates, balance);

}

private returnAccountHistory(transactions: Transaction[], initialBalance: number): string {
  let result = "date        || credit    || debit     || balance\n";
  let balance = initialBalance;

  for (const transaction of transactions) {
    const { date, amount, type } = transaction;
    const formattedDate = date.toLocaleDateString().padEnd(12);
    const formattedAmount = amount.toFixed(2).padStart(8);

    if (type === TransactionType.DEPOSIT) {
      balance += amount;
      result += `${formattedDate}|| ${formattedAmount}  ||           || ${balance.toFixed(2)}\n`;
    } else {
      balance -= amount;
      result += `${formattedDate}||           || ${formattedAmount}  || ${balance.toFixed(2)}\n`;
    }
  }

  return result;
}

public generatePDFStatement(filePath: string): void {
  const doc = new PDFDocument();
  const stream = fs.createWriteStream(filename);

  doc.pipe(stream);

  // Header
  doc
    .fontSize(12)
    .text('Bank Statement', { align: 'center' })
    .moveDown();

  // Account history
  const accountHistory = this.showAccountHistory();
  doc
    .fontSize(10)
    .text(accountHistory)
    .moveDown();
  doc.end();
}
}

const bankAccount = new Bank();
bankAccount.deposit(1000, new Date('2023-07-24'));
bankAccount.deposit(2000, new Date('2023-07-25'));
bankAccount.withdraw(500, new Date('2023-07-26'));
const filename = 'bank_statement.pdf';
bankAccount.generatePDFStatement(filename);
console.log(bankAccount.showAccountHistory())
