import {Transaction} from "./Transaction";
import {BankStatementGenerator} from "./BankStatementGenerator";

export class Account {
    private readonly _accountOwner: string
    private readonly _transactionHistory: Transaction[]
    private _allowedOverdraft: number = 0

    constructor(accountOwner: string) {
        this._accountOwner = accountOwner
        this._transactionHistory = []
    }

    depositMoney(amountDeposited: number): boolean {
        if (amountDeposited < 0)  {
            return false
        }
        this._transactionHistory.push(new Transaction(amountDeposited, 'deposit'))
        return true;
    }

    withdrawMoney(amountWithdrawn: number): boolean {
        if (amountWithdrawn > this.calculateBalance() + this.allowedOverdraft) {
            return false
        }
        this._transactionHistory.push(new Transaction(amountWithdrawn, 'withdrawal'))
        return true
    }

    calculateBalance(): number {
        let balance = 0;
        for (const transaction of this._transactionHistory) {
            balance += transaction.type === 'deposit' ? transaction.amount : -transaction.amount
        }
        return balance
    }

    addTransaction(addedTransaction: Transaction) {
        this._transactionHistory.push(addedTransaction)
    }

    generateBankStatement() {
        const transactions = this.sortTransactionsOldestToNewest()
        const bankStatementGenerator = new BankStatementGenerator()
        return bankStatementGenerator.generateBankStatement(transactions,0)
    }

    generateBankStatementBetweenDates(startDate: Date, endDate: Date) {
        this.sortTransactionsOldestToNewest()
        const transactions = this.filterTransactionsByDate(startDate,endDate)
        const balance = this.calculateBalanceBeforeTransaction(transactions[0])
        const bankStatementGenerator = new BankStatementGenerator()
        return bankStatementGenerator.generateBankStatement(transactions, balance)
    }

    get transactionHistory(): Transaction[] {
        return this._transactionHistory;
    }

    get allowedOverdraft(): number {
        return this._allowedOverdraft;
    }

    allowOverdraft(value: number): boolean {
        if (value < 0)  {
            return false
        }
        this._allowedOverdraft = value
        return true
    }

    private sortTransactionsOldestToNewest(): Transaction[] {
        return this._transactionHistory.sort((a, b) => a.transactionDate.getTime() - b.transactionDate.getTime())
    }

    private filterTransactionsByDate(startDate: Date, endDate: Date): Transaction[] {
        return this._transactionHistory.filter((transaction) => {
            const transactionDate = transaction.transactionDate;
            return transactionDate >= startDate && transactionDate <= endDate;
        });
    }

    private calculateBalanceBeforeTransaction(targetTransaction: Transaction): number {
        const targetTransactionIndex = this._transactionHistory.indexOf(targetTransaction)

        const transactionsBeforeTarget = this._transactionHistory.slice(0, targetTransactionIndex)
        return transactionsBeforeTarget.reduce((balance, transaction) => {
            balance += transaction.type === 'deposit' ? transaction.amount : -transaction.amount
            return balance
        }, 0)
    }
}
