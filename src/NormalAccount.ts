import { Transaction } from "../src/Transaction";
import fs from "fs";
import PDFDocument from "pdfkit";
export class NormalAccount {
  balance: number;
  transactions: Transaction[];
  debit: number;
  constructor() {
    this.balance = 0;
    this.transactions = [];
    this.debit = -500;
  }

  deposit(amount: number): string {
    if (amount > 0) {
      this.balance += amount;
      let transaction = new Transaction(amount, true, this.balance);
      this.transactions.push(transaction);
      return "Transaction has been done properly";
    }
    return "Transaction has been declined!";
  }
  withdraw(amount: number): string {
    if (amount > 0) {
      if (this.balance - amount >= this.debit) {
        this.balance -= amount;
        let transaction = new Transaction(amount, false, this.balance);
        this.transactions.push(transaction);
        return "Transaction has been done properly";
      }
    }
    return "Transaction has been declined!";
  }

  createStatement(dateFrom: Date, dateTo: Date) {
    let dateFromCompare = dateFrom.getTime();
    let dateToCompare = dateTo.getTime();
    if (this.transactions.length == 0) {
      return "Transaction list is empty!";
    }

    let statement = "   date    ||   credit  ||    debit  || balance\n";
    statement += "-------------------------------------------------\n";

    this.transactions.forEach((transaction) => {
      if (
        dateFromCompare <= transaction.date &&
        transaction.date <= dateToCompare
      ) {
        const credit: string = transaction.transactionType
          ? transaction.amount.toFixed(2)
          : "";
        const debit: string = !transaction.transactionType
          ? transaction.amount.toFixed(2)
          : "";
        statement += `${formatDate(transaction.date)} || ${credit.padStart(
          9
        )} || ${debit.padStart(9)} || ${transaction.balance
          .toFixed(2)
          .padStart(9)}\n`;
      }
    });
    return statement;
  }
  getAvailabeFunds(): number {
    let availableFunds: number = 0;
    this.transactions.forEach((transaction) => {
      if (transaction.transactionType) {
        availableFunds += transaction.amount;
      } else {
        availableFunds -= transaction.amount;
      }
    });
    return availableFunds;
  }
  printStatementToPDF(dateFrom: Date, dateTo: Date, filePath: string): string {
    try {
      const doc = new PDFDocument();
      const stream = fs.createWriteStream(filePath);
      let dateFromCompare = dateFrom.getTime();
      let dateToCompare = dateTo.getTime();
      if (this.transactions.length == 0) {
        return "Transaction list is empty!";
      }

      doc.text("   date         ||       credit         ||      debit    ||     balance\n");
      doc.text("-----------------------------------------------------------------------------\n");

      this.transactions.forEach((transaction) => {
        if (
          dateFromCompare <= transaction.date &&
          transaction.date <= dateToCompare
        ) {
          const credit: string = transaction.transactionType
            ? transaction.amount.toFixed(2)
            : "";
          const debit: string = !transaction.transactionType
            ? transaction.amount.toFixed(2)
            : "";
          doc.text(
            `${formatDate(transaction.date)} || ${credit.padStart(
              18
            )} || ${debit.padStart(15).padEnd(2)} || ${transaction.balance
              .toFixed(2)
              .padStart(15).padEnd(2)}\n`
          );
        }
      });
      doc.pipe(stream);
      doc.end();
    } catch (e) {
      return "Something went Wrong!";
    }

    return "PDF created properly!";
  }
}

function formatDate(timestamp: number): string {
  const dateObj = new Date(timestamp);
  const day = String(dateObj.getDate()).padStart(2, "0");
  const month = String(dateObj.getMonth() + 1).padStart(2, "0");
  const year = dateObj.getFullYear();
  return `${day}/${month}/${year}`;
}
