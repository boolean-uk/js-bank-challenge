import { Transfer } from "./Transfer";

export class Deposit extends Transfer {
    constructor(amountOfMoney: number) {
        super(amountOfMoney)
    }
}