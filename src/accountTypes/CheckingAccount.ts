import { Account } from "../Account";
import { Withdraw } from "../Withdraw";

export class CheckingAccount extends Account {
    private _OVERDRAFT_LIMIT = 50000
    constructor(accountNum: string) {
        super(accountNum)
    }

    overdraft(amountOfMoney: number) : boolean {
        if ((this.calculateBalance() - amountOfMoney < 0) &&
         (Math.abs(this.calculateBalance() - amountOfMoney) > this._OVERDRAFT_LIMIT))
         throw new Error("Overdraft!")
        else return false
    }

    override withdraw(amountOfMoney: number): void {
        if (!this.overdraft(amountOfMoney)) this.transactions.push(new Withdraw(amountOfMoney))
    }
}