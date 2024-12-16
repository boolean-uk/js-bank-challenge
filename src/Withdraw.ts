import { Transfer } from "./Transfer";

export class Withdraw extends Transfer {
    constructor(amountOfMoney: number) {
        super(amountOfMoney)
    }
}