export class Transaction {
    private date: Date
    private operation: string
    private amount: number 
    private balance : number;           
    
    constructor(date: Date, operation: string, amount: number, balance: number) {
        this.date = date
        this.operation = operation
        this.amount = amount
        this.balance = balance;

    }

    getDate(): Date {
        return this.date
    }

    getOperation(): string {
        return this.operation
    }

    getAmount(): number {
        return this.amount
    }

    getBalance(): number {
        return this.balance
    }
}