import { Account } from "./account";
import { Account_Transaction } from "./accountTransaction";

export class Savings_account extends Account {
    depositLimitPerYear : number
    
    constructor() {
        super();
        this.depositLimitPerYear = 20000;
    }

    addFunds(fundsToAdd : number){
        const depositLimitPerYearAfterTransaction = this.countFundsAddedInCurrentYear() + fundsToAdd;

        if(depositLimitPerYearAfterTransaction > this.depositLimitPerYear)
            throw new Error("You cannot add more than " + this.depositLimitPerYear + " in a year");

        super.addFunds(fundsToAdd);
    }

    countFundsAddedInCurrentYear() {
        const startOfCurrentYear = new Date(new Date().getFullYear(), 0, 1);
        const endOfCurrentYear = new Date(new Date().getFullYear()+1, 0, 1);
        const transactionsInThisYear = this.createTransactionListBetweenTimePeriod(startOfCurrentYear, endOfCurrentYear);

        return this.countBalance(transactionsInThisYear);    
    }

    countBalance(transactions : Array<Account_Transaction>){
        return Array.from(transactions).reduce((accumulator, currentValue) => {
            if(currentValue.transactionType == "credit")
                return accumulator + currentValue.amount;
            else
                return accumulator;
        }, 0);
    }
}