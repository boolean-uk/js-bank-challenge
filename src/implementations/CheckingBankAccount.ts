import { TransactionType } from "../enumerations/TransactionType";
import { AbstractBankAccount } from "./AbstractBankAccount";
import { Transaction } from "./Trasaction";

export class CheckingBankAccount extends AbstractBankAccount {
  constructor(private overdraftLimit: number) {
    super();
  }

  public override withdraw(amount: number, date: Date): boolean {
    if (
      amount <= 0 ||
      this.calculateCurrentBallance() - amount < -this.overdraftLimit
    ) {
      return false;
    }

    return (
      this.transactions.push(
        new Transaction(date, amount, TransactionType.Withdraw)
      ) > 0
    );
  }
}
