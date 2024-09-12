"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Bank = exports.TransactionType = void 0;
var fs = require("fs");
var PDFDocument = require('pdfkit');
var TransactionType;
(function (TransactionType) {
    TransactionType["DEPOSIT"] = "DEPOSIT";
    TransactionType["WITHDRAWAL"] = "WITHDRAWAL";
})(TransactionType || (exports.TransactionType = TransactionType = {}));
var Bank = /** @class */ (function () {
    function Bank() {
        this.transactions = [];
    }
    Bank.prototype.deposit = function (amount, date) {
        if (amount <= 0)
            return false;
        var transaction = {
            type: TransactionType.DEPOSIT,
            amount: amount,
            date: date,
        };
        this.transactions.push(transaction);
        return true;
    };
    Bank.prototype.withdraw = function (amount, date) {
        if (amount <= 0)
            return false;
        // Calculate the available funds by considering all transactions
        var availableFunds = 0;
        for (var _i = 0, _a = this.transactions; _i < _a.length; _i++) {
            var transaction_1 = _a[_i];
            if (transaction_1.type === TransactionType.DEPOSIT) {
                availableFunds += transaction_1.amount;
            }
            else {
                availableFunds -= transaction_1.amount;
            }
        }
        if (amount > availableFunds)
            return false;
        var transaction = {
            type: TransactionType.WITHDRAWAL,
            amount: amount,
            date: date,
        };
        this.transactions.push(transaction);
        return true;
    };
    Bank.prototype.showAccountHistory = function () {
        var result = "date        || credit    || debit     || balance\n";
        var balance = 0;
        for (var _i = 0, _a = this.transactions; _i < _a.length; _i++) {
            var transaction = _a[_i];
            var date = transaction.date, amount = transaction.amount, type = transaction.type;
            var formattedDate = date.toLocaleDateString().padEnd(12);
            var formattedAmount = amount.toFixed(2).padStart(8);
            if (type === TransactionType.DEPOSIT) {
                balance += amount;
                result += "".concat(formattedDate, "|| ").concat(formattedAmount, "  ||           || ").concat(balance.toFixed(2), "\n");
            }
            else {
                balance -= amount;
                result += "".concat(formattedDate, "||           || ").concat(formattedAmount, "  || ").concat(balance.toFixed(2), "\n");
            }
        }
        return result;
    };
    Bank.prototype.showAccountHistoryBetweenTwoDates = function (date1, date2) {
        if (date1 > date2)
            return "Wrong dates";
        var sortedTransactions = this.transactions.sort(function (a, b) { return a.date.getTime() - b.date.getTime(); });
        var transactionsBetweenTwoDates = [];
        for (var _i = 0, sortedTransactions_1 = sortedTransactions; _i < sortedTransactions_1.length; _i++) {
            var transaction = sortedTransactions_1[_i];
            if (transaction.date >= date1 && transaction.date <= date2) {
                transactionsBetweenTwoDates.push(transaction);
            }
        }
        var balance = 0;
        var transactionsBeforeStartDate = sortedTransactions.filter(function (transaction) { return transaction.date < date1; });
        for (var _a = 0, transactionsBeforeStartDate_1 = transactionsBeforeStartDate; _a < transactionsBeforeStartDate_1.length; _a++) {
            var transaction = transactionsBeforeStartDate_1[_a];
            if (transaction.type === TransactionType.DEPOSIT) {
                balance += transaction.amount;
            }
            else {
                balance -= transaction.amount;
            }
        }
        return this.returnAccountHistory(transactionsBetweenTwoDates, balance);
    };
    Bank.prototype.returnAccountHistory = function (transactions, initialBalance) {
        var result = "date        || credit    || debit     || balance\n";
        var balance = initialBalance;
        for (var _i = 0, transactions_1 = transactions; _i < transactions_1.length; _i++) {
            var transaction = transactions_1[_i];
            var date = transaction.date, amount = transaction.amount, type = transaction.type;
            var formattedDate = date.toLocaleDateString().padEnd(12);
            var formattedAmount = amount.toFixed(2).padStart(8);
            if (type === TransactionType.DEPOSIT) {
                balance += amount;
                result += "".concat(formattedDate, "|| ").concat(formattedAmount, "  ||           || ").concat(balance.toFixed(2), "\n");
            }
            else {
                balance -= amount;
                result += "".concat(formattedDate, "||           || ").concat(formattedAmount, "  || ").concat(balance.toFixed(2), "\n");
            }
        }
        return result;
    };
    Bank.prototype.generatePDFStatement = function (filePath) {
        var doc = new PDFDocument();
        var stream = fs.createWriteStream(filename);
        doc.pipe(stream);
        // Header
        doc
            .fontSize(12)
            .text('Bank Statement', { align: 'center' })
            .moveDown();
        // Account history
        var accountHistory = this.showAccountHistory();
        doc
            .fontSize(10)
            .text(accountHistory)
            .moveDown();
        doc.end();
    };
    return Bank;
}());
exports.Bank = Bank;
var bankAccount = new Bank();
bankAccount.deposit(1000, new Date('2023-07-24'));
bankAccount.deposit(2000, new Date('2023-07-25'));
bankAccount.withdraw(500, new Date('2023-07-26'));
var filename = 'bank_statement.pdf';
bankAccount.generatePDFStatement(filename);
console.log(bankAccount.showAccountHistory());
