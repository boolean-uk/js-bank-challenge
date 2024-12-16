export class Transfer {
    private _amountOfMoney
    private _date = new Date()

    constructor(amountOfMoney: number) {
        this._amountOfMoney = amountOfMoney
    }

    public get amountOfMoney() {
        return this._amountOfMoney
    }

    public get date() {
        return this._date
    }
}