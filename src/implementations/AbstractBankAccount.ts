import { TransactionType } from "../enumerations/TransactionType";
import { IBankAccount } from "../interfaces/IBankAccount";
import { ITransaction } from "../interfaces/ITransaction";
import { Transaction } from "./Trasaction";

export abstract class AbstractBankAccount implements IBankAccount {
  protected transactions: ITransaction[];

  constructor() {
    this.transactions = [];
  }

  public deposit(amount: number, date: Date): boolean {
    if (amount <= 0) {
      return false;
    }

    return (
      this.transactions.push(
        new Transaction(date, amount, TransactionType.Deposit)
      ) > 0
    );
  }

  public withdraw(amount: number, date: Date): boolean {
    if (amount <= 0 || this.calculateCurrentBallance() - amount < 0) {
      return false;
    }

    return (
      this.transactions.push(
        new Transaction(date, amount, TransactionType.Withdraw)
      ) > 0
    );
  }

  public getTransactions(): ITransaction[] {
    return this.transactions;
  }

  protected calculateCurrentBallance(): number {
    return this.transactions
      .map((t) =>
        t.getType() === TransactionType.Withdraw
          ? -t.getAmount()
          : t.getAmount()
      )
      .reduce((acc, curr) => acc + curr, 0);
  }
}
