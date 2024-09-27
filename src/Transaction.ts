export class Transaction {
  date: number;
  amount: number;
  transactionType: boolean;
  balance: number;
  constructor(amount: number, transactionType: boolean, balance: number) {
    this.date = Date.now();
    this.amount = amount;
    this.transactionType = transactionType;
    this.balance = balance;
  }
}
