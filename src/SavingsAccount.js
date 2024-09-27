"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SavingsAccount = void 0;
const NormalAccount_1 = require("./NormalAccount");
const Transaction_1 = require("./Transaction");
class SavingsAccount extends NormalAccount_1.NormalAccount {
    constructor() {
        super();
        this.debit = 0;
        this.deposityearlimit = 20000;
    }
    deposit(amount) {
        if (amount > 0 && this.deposityearlimit > amount) {
            this.balance += amount;
            this.deposityearlimit -= amount;
            let transaction = new Transaction_1.Transaction(amount, true, this.balance);
            this.transactions.push(transaction);
            return "Transaction has been done properly";
        }
        return "Transaction has been declined!\n Wrong data provided or year limit exceeded!";
    }
}
exports.SavingsAccount = SavingsAccount;
