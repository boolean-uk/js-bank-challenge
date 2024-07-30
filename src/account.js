import Bank from "./bank.js"
import { Transaction } from "./transactions.js"

class Account extends Bank {
    #transactions

    constructor(firstName, lastName) {
        super()
        this.firstName = firstName
        this.lastName = lastName
        this.#transactions = []
        this.id = 1
    }

    createTransaction(date) {
        if(!typeof date === 'string' || date === undefined || date.length < 10 || date.length > 10) {
            throw 'Invalid date, must be dd/mm/yyyy'
        }
        const transaction = new Transaction(this.id, date)
        this.id++
        this.#transactions.push(transaction)
        return transaction
    }

    deposit(cash, date) {

        if(!typeof cash === 'number') {
            throw 'Invalid input please provide a number value'
        }
        const deposit = this.createTransaction(date)
        deposit.credit = this.round(cash)
        deposit.debit = 0
        this.addAccount(this)
    }

    withdraw(cash, date) {

        if(!typeof cash === 'number') {
            throw 'Invalid input please provide a number value'
        }
        const withdraw = this.createTransaction(date)
        withdraw.debit = this.round(cash)
        withdraw.credit = 0
        this.addAccount(this)
    }

    getBalance() {
        
        let balanceTotal = 0
        this.#transactions.map((t) => {balanceTotal += t.credit - t.debit})
    
        const balance = this.round(balanceTotal)
        return balance
    }

    format(transaction) {
        if(transaction === 0) {
            return '          '
        }
        if(transaction.length < 5) {
            return `     £${transaction}`
        }
        if(transaction.length < 7) {
            return `   £${transaction}`
        }
        if(transaction.length < 8) {
            return `  £${transaction}`
        }
        return `£${transaction}`
    }

    round(number) {
        return ((Math.round(number * 100) / 100).toFixed(2))
    }

    get transactions() {
        return [...this.#transactions]
    }

    printBankStatement() {
        let transactions = this.#transactions
        
        console.log('date     ||  credit    ||  debit     ||    balance')
        for(let i = 0; i < transactions.length; i++) {
console.log(`${transactions[i].date} || ${this.format(transactions[i].credit)} || ${this.format(transactions[i].debit)} || £${this.getBalance()}`)
        }
    }
}

export { Account }

const accountInst = new Account('Frank', 'Reynolds')
accountInst.deposit(1.50, '10/08/2024')
accountInst.deposit(3.25, '11/08/2024')
accountInst.deposit(123.23, '13/10/2024')
accountInst.withdraw(0.57, '14/09/2024')
accountInst.deposit(3.00, '15/10/2024')
accountInst.withdraw(4.00, '16/10/2024')
accountInst.deposit(1000, '17/10/2024')

accountInst.printBankStatement()










