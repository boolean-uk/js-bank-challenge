import { TransactionType } from "../enumerations/TransactionType";
import { AbstractBankAccount } from "./AbstractBankAccount";
import { Transaction } from "./Trasaction";

export class InvestmentBankAccount extends AbstractBankAccount {
  public accumulateInterest(interestRate: number, date: Date): boolean {
    if (date.getDate() !== 1) {
      return false;
    }

    let totalInterest = 0;
    let totalBalance = 0;

    for (let i = 0; i < this.transactions.length; i++) {
      const transaction = this.transactions[i];

      if (transaction.getDate() > date) {
        break;
      }

      if (transaction.getType() === TransactionType.Deposit) {
        totalBalance += transaction.getAmount();
      } else {
        totalBalance -= transaction.getAmount();
      }

      if (!this.isDateFromPreviousMonth(transaction.getDate(), date)) {
        continue;
      }

      const nextDate =
        i + 1 < this.transactions.length &&
        this.isDateFromPreviousMonth(this.transactions[i + 1].getDate(), date)
          ? this.transactions[i + 1].getDate()
          : date;

      const timeDiff =
        (nextDate.getTime() - transaction.getDate().getTime()) /
        (1000 * 3600 * 24);

      totalInterest += totalBalance * (interestRate / 100) * (timeDiff / 30);
    }

    return (
      this.transactions.push(
        new Transaction(date, totalInterest, TransactionType.Intrests)
      ) > 0
    );
  }

  private isDateFromPreviousMonth(
    dateToCheck: Date,
    currentDate: Date
  ): boolean {
    const previousMonthDate = new Date(currentDate);

    previousMonthDate.setMonth(currentDate.getMonth() - 1);

    return (
      dateToCheck.getMonth() === previousMonthDate.getMonth() &&
      dateToCheck.getFullYear() === previousMonthDate.getFullYear()
    );
  }
}
