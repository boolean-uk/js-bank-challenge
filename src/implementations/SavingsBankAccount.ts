import { TransactionType } from "../enumerations/TransactionType";
import { AbstractBankAccount } from "./AbstractBankAccount";
import { Transaction } from "./Trasaction";

export class SavingsBankAccount extends AbstractBankAccount {
  constructor(private depositLimitPerYear: number) {
    super();
  }

  public override deposit(amount: number, date: Date): boolean {
    if (
      amount <= 0 ||
      this.calculateYearlyTotalDeposit(date.getFullYear()) + amount >
        this.depositLimitPerYear
    ) {
      return false;
    }

    return (
      this.transactions.push(
        new Transaction(date, amount, TransactionType.Deposit)
      ) > 0
    );
  }

  private calculateYearlyTotalDeposit(year: number): number {
    return this.transactions
      .map((t) =>
        t.getType() === TransactionType.Deposit &&
        t.getDate().getFullYear() === year
          ? t.getAmount()
          : 0
      )
      .reduce((acc, curr) => acc + curr, 0);
  }
}
