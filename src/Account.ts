import { Deposit } from "./Deposit"
import { Transfer } from "./Transfer"
import { Withdraw } from "./Withdraw"

export class Account {
    private _accountNum: string
    private _transactions: Transfer[]

    constructor(accountNum: string){
        this._accountNum = accountNum
        this._transactions = []
    }

    public get accountNum(){
        return this._accountNum
    }

    public get transactions() {
        return this._transactions
    }

    deposit(amountOfMoney: number) {
        this._transactions.push(new Deposit(amountOfMoney))
    }

    checkIfHasEnoughMoney(amountOfMoney: number) {
        if (this.calculateBalance() < amountOfMoney) {
            throw new Error("Not enough money!")
        }
    }

    withdraw(amountOfMoney: number) {
        this.checkIfHasEnoughMoney(amountOfMoney)
        this._transactions.push(new Withdraw(amountOfMoney))
    }

    calculateBalance(): number {
        let balance = 0

        for (let i = 0; i < this._transactions.length; i ++) {
            if (this._transactions[i] instanceof Withdraw) {
                balance -= this._transactions[i].amountOfMoney
            }
            else balance += this._transactions[i].amountOfMoney
        }

        return balance
    }

    generateBankStatements(startDate: Date, endDate: Date) {
        const tableHeaders = ['Date', 'Credit', 'Debit', 'Balance'];
        const headerRow = tableHeaders.map(header => header.padEnd(12)).join('');

        let debit: number, credit: number, date, sum = 0

        const tableData = this.transactions.map((trasaction) => {
            if (trasaction.date >= startDate && trasaction.date <= endDate) {
                date = trasaction.date.toLocaleDateString()
                if (trasaction instanceof Withdraw) {
                    debit = 0;
                    credit = trasaction.amountOfMoney / 100.0
                    sum -= trasaction.amountOfMoney / 100.0
                } else if (trasaction instanceof Deposit) {
                    credit = 0;
                    debit = trasaction.amountOfMoney / 100.0
                    sum += trasaction.amountOfMoney / 100.0
                }

                return `${date.padEnd(12)}${credit.toString().padEnd(12)}${debit.toString().padEnd(12)}${sum.toString()}\n`;
            }
                
        });

        return headerRow + '\n' + tableData.join('')
    }
}