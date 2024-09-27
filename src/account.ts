import { Transaction, TransactionType } from "./Transaction";

export class Account {
  transactions: Transaction[];
  balance: number;
  accountNumber: number;
  constructor() {
    this.balance = 0;
    this.transactions = [];
    this.accountNumber = this.generateAccountNumber();
  }

  generateAccountNumber(): number {
    return Math.floor(Math.random() * (999999999 - 100000000 + 1) + 100000000);
  }

  depositFunds(amount: number, date: Date): void {
    this.balance += amount;
    const transaction: Transaction = new Transaction(
      TransactionType.Credit,
      amount,
      this.balance,
      date
    );
    this.transactions.push(transaction);
  }

  withdrawFunds(amount: number, date: Date): void {
    if (amount > this.balance) {
      throw new Error("You don't have enough money to make this withdrawal");
    }
    this.balance -= amount;
    const transaction: Transaction = new Transaction(
      TransactionType.Debit,
      amount,
      this.balance,
      date
    );
    this.transactions.push(transaction);
  }

  getBalance(): number {
    return this.balance;
  }

  getTransactions(): Transaction[] {
    return this.transactions;
  }

  getTransactionsBetweenTwoDates(dateFrom: Date, dateTo: Date): Transaction[] {
    let filteredTransactions = this.transactions
      .filter((el) => {
        return (
          el.getDate() >= dateFrom &&
          el.getDate() <= dateTo
        );
      });
      filteredTransactions.sort((a, b) => a.getDate().toLocaleTimeString().localeCompare(b.getDate().toLocaleDateString()))
      .reverse();

      return filteredTransactions;
  }

  getAccountStatement(): string {
    let statement = "date      || credit || debit   || balance\n";
    this.transactions
      .sort((a, b) => a.getDate().toLocaleTimeString().localeCompare(b.getDate().toLocaleTimeString()))
      .reverse();
    this.transactions.forEach((element) => {
      statement += element.getTransactionDescription();
      statement += "\n";
    });

    return statement;
  }

  getAccountStatementBetweenTwoDates(filteredTransactions: Transaction[]): string {
    let statement = "date      || credit || debit   || balance\n";
      filteredTransactions.forEach((element) => {
        statement += element.getTransactionDescription();
        statement += "\n";
      });

    return statement;
  }
}
