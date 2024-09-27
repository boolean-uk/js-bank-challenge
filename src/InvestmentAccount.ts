import { NormalAccount } from "./NormalAccount";
import { Transaction } from "./Transaction";

export class InvestmentAccount extends NormalAccount {
  interestStartDate: Date;
  interest: number = 0;
  interestrate = 0.02;
  constructor() {
    super();
    this.interestStartDate = new Date();
    this.debit = 0;
  }

  checkInterest(): number {
    let interest: number = 0;
    let monthsPassedBy = getMonthsBetweenDates(
      this.interestStartDate,
      new Date()
    );

    for (let i = 0; i < monthsPassedBy; i++) {
      interest += (this.balance + interest) * this.interestrate;
    }
    return interest;
  }
  getBalanceWithInterest():number{
    return this.balance+this.checkInterest()
  }

}





function getMonthsBetweenDates(dateFrom: Date, dateTo: Date): number {
  const yearDiff = dateTo.getFullYear() - dateFrom.getFullYear();
  const monthDiff = dateTo.getMonth() - dateFrom.getMonth();

  return yearDiff * 12 + monthDiff;
}
