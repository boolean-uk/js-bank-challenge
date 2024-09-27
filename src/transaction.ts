export class Transaction {
  constructor(
    private transactionType: TransactionType,
    private amount: number,
    private balanceAfterTransaction: number, 
    private date: Date
  ) {}

  getTransactionDescription(): string{
    if (this.transactionType === TransactionType.Credit) {
        return this.date.toLocaleDateString() + " || " + this.amount + "    || " + "        || " + this.balanceAfterTransaction;
    } else {
        return this.date.toLocaleDateString() + " || " + "       || " + this.amount + "     || " + this.balanceAfterTransaction;
    }
  }

  getDate(): Date{
    return this.date;
  }
}

export enum TransactionType {
  Credit,
  Debit,
}
