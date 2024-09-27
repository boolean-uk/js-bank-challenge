export class Transaction {
    private readonly _transactionDate: Date;
    private readonly _amount: number;
    private readonly _type: string;

    constructor(amount: number, type: string);
    constructor(amount: number, type: string, transactionDate: Date)

    constructor(amount: number, type: string, transactionDate?: Date) {
        this._amount = amount;
        this._type = type;
        this._transactionDate = transactionDate || new Date();
    }

    public getTransactionDate(): string {
        return this.formatDate(this._transactionDate)
    }

    get transactionDate(): Date {
        return this._transactionDate;
    }

    get amount(): number {
        return this._amount;
    }

    get type(): string {
        return this._type;
    }

    private formatDate(date: Date): string {
        const day = date.getDate().toString()
        const month = (date.getMonth() + 1).toString()
        const year = date.getFullYear()

        return `${day}/${month}/${year}`
    }
}