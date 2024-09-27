"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InvestmentAccount = void 0;
const NormalAccount_1 = require("./NormalAccount");
class InvestmentAccount extends NormalAccount_1.NormalAccount {
    constructor() {
        super();
        this.interest = 0;
        this.interestrate = 0.02;
        this.interestStartDate = new Date();
        this.debit = 0;
    }
    checkInterest() {
        let interest = 0;
        let monthsPassedBy = getMonthsBetweenDates(this.interestStartDate, new Date());
        for (let i = 0; i < monthsPassedBy; i++) {
            interest += (this.balance + interest) * this.interestrate;
        }
        return interest;
    }
    getBalanceWithInterest() {
        return this.balance + this.checkInterest();
    }
}
exports.InvestmentAccount = InvestmentAccount;
function getMonthsBetweenDates(dateFrom, dateTo) {
    const yearDiff = dateTo.getFullYear() - dateFrom.getFullYear();
    const monthDiff = dateTo.getMonth() - dateFrom.getMonth();
    return yearDiff * 12 + monthDiff;
}
