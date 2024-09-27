

import { Transaction } from "./Transaction"

export class BankAccount {

    private balance: number;
    private transactions: Transaction[] = [];
    private canBeOverdrafted: boolean

    constructor() {
        this.balance = 0;
        this.transactions = []
        this.canBeOverdrafted = false;
    }

    setOverdraftToTrue() {
        this.canBeOverdrafted = true;
    }

    getBalance() {
        return this.balance
    }

    getTransaction(): Transaction[] {        
        return this.transactions
    }

    deposit(amount: number, date: Date): boolean {

        
        if(amount <= 0) {
            console.log("Amount can't be 0 or negative number")
            return false;
        }

        this.balance += amount;
        const transaction = new Transaction(date, "credit", amount, this.balance)
        this.transactions.push(transaction) 
        this.sortTransactionsByDate()       
        return true;
    }

    withdraw(amount: number, date: Date): boolean {

        
        if(amount <= 0) {
            return false;
        }
        if(this.balance - amount < 0 && this.canBeOverdrafted === false) {
            return false;
        }
        if(this.balance - amount < -500 && this.canBeOverdrafted === true) {
            return false;
        }
        
        this.balance -= amount
        const transaction = new Transaction(date, "debit", amount, this.balance)
        this.transactions.push(transaction)
        
        return true
    }

    printStatement(): string {
        let statement = "date       ||  credit   ||   debit   || balance\n";
        let balance = 0
        this.transactions
        .sort((a, b) => a.getDate().toLocaleTimeString().localeCompare(b.getDate().toLocaleTimeString()))
        .reverse();

        for(const transaction of this.transactions) {
            //const date = this.formatDate(transaction.getDate())
            const date = transaction.getDate().toLocaleDateString()
            //const date = transaction.getDate()            
            const amount = transaction.getAmount().toFixed(2)
            const emptyString = ''

            if(transaction.getOperation() === "credit") {
                balance += transaction.getAmount()
                const FormatBalance = balance.toFixed(2)
                statement += `${date} || ${amount.padStart(7)} || ${emptyString.padStart(7)} || ${transaction.getBalance().toFixed(2)}\n`
            }else {
                balance -= transaction.getAmount()
                const FormatBalance = balance.toFixed(2)
                statement += `${date} || ${emptyString.padStart(7)} || ${amount.padStart(7)} || ${transaction.getBalance().toFixed(2)}\n`
            }
        }       
        
        return statement
    }

    sortTransactionsByDate() {
        this.transactions.sort((a, b) => a.getDate().getTime() - b.getDate().getTime());
    }   

    getTransactionsBetweenTwoDates(fromDate: Date, toDate: Date): Transaction[] {
        let beetweenDatesTransactions = this.transactions
          .filter((transaction) => {
            return (
              transaction.getDate() >= fromDate &&
              transaction.getDate() <= toDate
            );
          });
          
          beetweenDatesTransactions.sort((a, b) => a.getDate().getTime() - b.getDate().getTime()).reverse();
    
          return beetweenDatesTransactions;
      }

    printBankStatementBetweenDates(fromDate: Date, toDate: Date): string {
        //this.sortTransactionsOldestToNewest()        
        const transactions = this.getTransactionsBetweenTwoDates(fromDate, toDate)

        let statement = "date       ||  credit   ||   debit   || balance\n";
        let balance = 0

        for(const transaction of transactions) {
            //const date = this.formatDate(transaction.getDate())
            const date = transaction.getDate().toLocaleDateString()
            //const date = transaction.getDate()            
            const amount = transaction.getAmount().toFixed(2)
            const emptyString = ''

            if(transaction.getOperation() === "credit") {
                balance += transaction.getAmount()
                const FormatBalance = balance.toFixed(2)
                statement += `${date} || ${amount.padStart(7)} || ${emptyString.padStart(7)} || ${transaction.getBalance().toFixed(2)}\n`
            }else {
                balance -= transaction.getAmount()
                const FormatBalance = balance.toFixed(2)
                statement += `${date} || ${emptyString.padStart(7)} || ${amount.padStart(7)} || ${transaction.getBalance().toFixed(2)}\n`
            }
        }      
        return statement
    }



}

const account = new BankAccount()
const date = new Date('02/10/2022')
const date1 = new Date('02/12/2022')
const date2 = new Date('02/13/2022')            
account.deposit(1000, date)
account.deposit(3000, date1)
account.withdraw(500, date2)
console.log(account.printStatement)
console.log(account.printBankStatementBetweenDates(
    new Date('02/05/2022'),
    new Date('02/12/2022')
  ))
