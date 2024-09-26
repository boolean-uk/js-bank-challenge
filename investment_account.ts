import { Account } from "./account";
import { Account_Transaction } from "./accountTransaction";
import * as schedule from 'node-schedule';

export class Investment_account extends Account {
    interestReate : number

    constructor() {
        super();
        this.interestReate = 0.02;
        this.scheduleMonthlyInterest();
    }

    calculateMonthlyInterest() {
        const balance = this.countBalance(this.accountTransactionList);
        const interestRateIncome = balance * this.interestReate;
        this.accountTransactionList.push(new Account_Transaction(new Date(), "+ interest rate", interestRateIncome));
    }

    countBalance(transactions : Array<Account_Transaction>){
        return Array.from(transactions).reduce((accumulator, currentValue) => {
            if(currentValue.transactionType == "credit")
                return accumulator + currentValue.amount;
            else if (currentValue.transactionType == "+ interest rate")
                return accumulator + currentValue.amount;
            else
                return accumulator - currentValue.amount;
        }, 0);
    }

    formatTransactions(trasactionsToFormat : Array<Account_Transaction>){
        let balance = 0;
        return trasactionsToFormat.map((accountTransaction) => {
            const transactionDate =
            accountTransaction.date.getDate() +
            "/" +
            (accountTransaction.date.getMonth() + 1) + 
            "/" +
            accountTransaction.date.getFullYear();

            let formattedTransaction = {
            date: transactionDate,
            credit: "",
            debit: "",
            interestReate: "",
            balance: ""
            };

            if (accountTransaction.transactionType === "credit") {
                balance += accountTransaction.amount;
                formattedTransaction.credit = accountTransaction.amount.toFixed(2);
            } else if (accountTransaction.transactionType === "+ interest rate") {
                balance += accountTransaction.amount;
                formattedTransaction.interestReate = accountTransaction.amount.toFixed(2);
            } else {
                balance -= accountTransaction.amount;
                formattedTransaction.debit = accountTransaction.amount.toFixed(2);
            }

            formattedTransaction.balance = balance.toFixed(2);
            return formattedTransaction;
        });
    }

    scheduleMonthlyInterest() {
        schedule.scheduleJob('0 12 1 * *', () => this.calculateMonthlyInterest());
    }
}
