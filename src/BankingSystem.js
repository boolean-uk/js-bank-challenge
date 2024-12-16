export default class BankingSystem {
    #credit
    #debit
    #balance
    #transaction
    #lastTransactionDate

    constructor() {
        this.#credit = 0
        this.#debit = 0
        this.#balance = 0
        this.#transaction = []
        this.#lastTransactionDate = null
        BankingSystem.instance = this
        return this
    }

    get balance() {
        return this.#balance.toFixed(2)
    }

    #isNumber(num) {
        return typeof num === 'number'
    }

    #isValidDate(date) {
        return !this.#lastTransactionDate || new Date(date) >= this.#lastTransactionDate
    }

    deposit(date, amount) {
        if (
            !this.#isNumber(amount) || 
            !this.#isValidDate(date) || 
            amount <= 0
        ) {
            throw new Error('Deposit invalidated.')
        }

        this.#balance += amount
        this.#transaction.push(
            [new Date(date).toDateString(), amount.toFixed(2), '', this.#balance.toFixed(2)]
        )
        this.#lastTransactionDate = new Date(date)
    }

    withdraw(date, amount) {
        if (
            !this.#isNumber(amount) || 
            !this.#isValidDate(date) || 
            amount > this.#balance || 
            amount <= 0
        ) {
            throw new Error('Withdraw invalidated.')
        }
        
        this.#balance -= amount
        this.#transaction.push(
            [new Date(date).toDateString(), '', amount.toFixed(2), this.#balance.toFixed(2)]
        )
        this.#lastTransactionDate = new Date(date)
    }

    #givePad(name, length) {
        const str = `${name}`
        return str.padEnd(length, ' ')
    }

    printBankStatement() {
        if (this.#transaction.length === 0) {
            throw new Error('No transaction found.')
        }

        let bankStatement = `${this.#givePad('date', 15)} || ${this.#givePad('credit', 15)} || ${this.#givePad('debit', 15)} || ${this.#givePad('balance', 15)}\n`

        this.#transaction.forEach(t => {
            bankStatement += `${this.#givePad(t[0], 15)} || ${this.#givePad(t[1], 15)} || ${this.#givePad(t[2], 15)} || ${this.#givePad(t[3], 15)}\n`
        })

        return bankStatement
    }

    printBankStatementBetweenDates(startDate, endDate) {
        const start = new Date(startDate)
        const end = new Date(endDate)
        
        if (end <= start) {
            throw new Error('Bank Statement print invalidated.')
        }

        start.setHours(0, 0, 0, 0)
        end.setHours(0, 0, 0, 0)

        let filteredTransactions = this.#transaction.filter(t => {
            const transactionDate = new Date(t[0])
            transactionDate.setHours(0, 0, 0, 0)
            return transactionDate >= start && transactionDate <= end
        })

        if (filteredTransactions.length === 0) {
            throw new Error('No transaction found.')
        }

        let bankStatement = `${this.#givePad('date', 15)} || ${this.#givePad('credit', 15)} || ${this.#givePad('debit', 15)} || ${this.#givePad('balance', 15)}\n`

        filteredTransactions.forEach(t => {
            bankStatement += `${this.#givePad(t[0], 15)} || ${this.#givePad(t[1], 15)} || ${this.#givePad(t[2], 15)} || ${this.#givePad(t[3], 15)}\n`
        })

        return bankStatement
    }    
}
