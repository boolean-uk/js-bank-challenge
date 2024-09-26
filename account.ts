import { Account_Transaction } from "./accountTransaction";
import { saveToPDF } from "./saveToPdf";

export class Account{
    accountTransactionList : Array<Account_Transaction> = [];

    addFunds(fundsToAdd : number){
        if(fundsToAdd < 0)
            throw new Error("Funds number cannot be negative");
        
        this.accountTransactionList.push(new Account_Transaction(new Date(), "credit", fundsToAdd));
    }

    getFunds(fundsToGet : number){
        let fundsAfterTransaction = this.getBalance() - fundsToGet

        if(fundsAfterTransaction < 0)
            throw new Error("Balance after transaction would be negative");

        this.accountTransactionList.push(new Account_Transaction(new Date(), "debit", fundsToGet));
    }

    getBalance(){
         return this.countBalance(this.accountTransactionList);
    }

    countBalance(transactions : Array<Account_Transaction>){
        return Array.from(transactions).reduce((accumulator, currentValue) => {
            if(currentValue.transactionType == "credit")
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
            balance: "",
            };

            if (accountTransaction.transactionType === "credit") {
            balance += accountTransaction.amount;
            formattedTransaction.credit = accountTransaction.amount.toFixed(2);
            } else {
            balance -= accountTransaction.amount;
            formattedTransaction.debit = accountTransaction.amount.toFixed(2);
            }

            formattedTransaction.balance = balance.toFixed(2);
            return formattedTransaction;
        });
    }

    getAccountTransactionList() {
        const formattedTransaction = this.formatTransactions(this.accountTransactionList);
        console.table(formattedTransaction);
    }

    createTransactionListBetweenTimePeriod(startDate : Date, endDate : Date) {
        return this.accountTransactionList.filter((accountTransaction) => {
            return accountTransaction.date >= startDate && accountTransaction.date <= endDate;
        });
    }

    getAccountTransactionListBetweenTimePeriod(startDate : Date, endDate : Date) {
    let balance = 0;
    
    const ListOfTransactionsBetweenTimePeriod = this.createTransactionListBetweenTimePeriod(startDate, endDate);

    const formattedTransaction = this.formatTransactions(ListOfTransactionsBetweenTimePeriod);

    console.table(formattedTransaction);
    }

    saveTransactionToPdf(){
        const formattedTransaction = this.formatTransactions(this.accountTransactionList);
        saveToPDF(formattedTransaction);
    }
}
