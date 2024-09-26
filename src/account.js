const TransactionDate = require("./transactionDate.js");
const Receipt = require("./receipt.js");

class Account {
    constructor() {
        this.transactions = [];
        this.balance = 0;
    }

    credit(amount) {
        if (amount === 0 || amount === NaN) {
            throw new Error("Enter valid amount");
        }
        const transactionDate = new TransactionDate();
        this.balance += amount;

        let transaction = {
            date: transactionDate.createDate(),
            type: "credit",
            amount: amount,
            balance: this.balance
        };

        this.transactions.push(transaction);
        return this.transactions;
    }

    debit(amount) {
        if (amount === 0 || amount === NaN) {
            throw new Error("Enter valid amount");
        }
        if (amount > this.balance) {
            throw new Error("Cannot withdraw more than you have");
        }
        const transactionDate = new TransactionDate();
        this.balance -= amount;

        let transaction = {
            date: transactionDate.createDate(),
            type: "debit",
            amount: amount,
            balance: this.balance
        };

        this.transactions.push(transaction);
        return this.transactions;
    }

    printStatement() {
        const receipt = new Receipt(this.transactions);
        return receipt.print();
    }
}

module.exports = Account;

const account = new Account();
account.credit(4000);
account.credit(3000);
account.credit(2000);
account.debit(1000);

console.log(account.printStatement());