"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Transaction = void 0;
class Transaction {
    constructor(amount, transactionType, balance) {
        this.date = Date.now();
        this.amount = amount;
        this.transactionType = transactionType;
        this.balance = balance;
    }
}
exports.Transaction = Transaction;
