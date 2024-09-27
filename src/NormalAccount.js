"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NormalAccount = void 0;
const Transaction_1 = require("../src/Transaction");
const fs_1 = __importDefault(require("fs"));
const pdfkit_1 = __importDefault(require("pdfkit"));
class NormalAccount {
    constructor() {
        this.balance = 0;
        this.transactions = [];
        this.debit = -500;
    }
    deposit(amount) {
        if (amount > 0) {
            this.balance += amount;
            let transaction = new Transaction_1.Transaction(amount, true, this.balance);
            this.transactions.push(transaction);
            return "Transaction has been done properly";
        }
        return "Transaction has been declined!";
    }
    withdraw(amount) {
        if (amount > 0) {
            if (this.balance - amount >= this.debit) {
                this.balance -= amount;
                let transaction = new Transaction_1.Transaction(amount, false, this.balance);
                this.transactions.push(transaction);
                return "Transaction has been done properly";
            }
        }
        return "Transaction has been declined!";
    }
    createStatement(dateFrom, dateTo) {
        let dateFromCompare = dateFrom.getTime();
        let dateToCompare = dateTo.getTime();
        if (this.transactions.length == 0) {
            return "Transaction list is empty!";
        }
        let statement = "   date    ||   credit  ||    debit  || balance\n";
        statement += "-------------------------------------------------\n";
        this.transactions.forEach((transaction) => {
            if (dateFromCompare <= transaction.date &&
                transaction.date <= dateToCompare) {
                const credit = transaction.transactionType
                    ? transaction.amount.toFixed(2)
                    : "";
                const debit = !transaction.transactionType
                    ? transaction.amount.toFixed(2)
                    : "";
                statement += `${formatDate(transaction.date)} || ${credit.padStart(9)} || ${debit.padStart(9)} || ${transaction.balance
                    .toFixed(2)
                    .padStart(9)}\n`;
            }
        });
        return statement;
    }
    getAvailabeFunds() {
        let availableFunds = 0;
        this.transactions.forEach((transaction) => {
            if (transaction.transactionType) {
                availableFunds += transaction.amount;
            }
            else {
                availableFunds -= transaction.amount;
            }
        });
        return availableFunds;
    }
    printStatementToPDF(dateFrom, dateTo, filePath) {
        try {
            const doc = new pdfkit_1.default();
            const stream = fs_1.default.createWriteStream(filePath);
            let dateFromCompare = dateFrom.getTime();
            let dateToCompare = dateTo.getTime();
            if (this.transactions.length == 0) {
                return "Transaction list is empty!";
            }
            doc.text("   date         ||       credit         ||      debit    ||     balance\n");
            doc.text("-----------------------------------------------------------------------------\n");
            this.transactions.forEach((transaction) => {
                if (dateFromCompare <= transaction.date &&
                    transaction.date <= dateToCompare) {
                    const credit = transaction.transactionType
                        ? transaction.amount.toFixed(2)
                        : "";
                    const debit = !transaction.transactionType
                        ? transaction.amount.toFixed(2)
                        : "";
                    doc.text(`${formatDate(transaction.date)} || ${credit.padStart(18)} || ${debit.padStart(15).padEnd(2)} || ${transaction.balance
                        .toFixed(2)
                        .padStart(15).padEnd(2)}\n`);
                }
            });
            doc.pipe(stream);
            doc.end();
        }
        catch (e) {
            return "Something went Wrong!";
        }
        return "PDF created properly!";
    }
}
exports.NormalAccount = NormalAccount;
function formatDate(timestamp) {
    const dateObj = new Date(timestamp);
    const day = String(dateObj.getDate()).padStart(2, "0");
    const month = String(dateObj.getMonth() + 1).padStart(2, "0");
    const year = dateObj.getFullYear();
    return `${day}/${month}/${year}`;
}
