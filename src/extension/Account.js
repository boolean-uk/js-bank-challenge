"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Account = void 0;
var TRANSACTION_TYPE_1 = require("../enums/TRANSACTION_TYPE");
var BankStatement_1 = require("./BankStatement");
var Transaction_1 = require("./Transaction");
var fs_1 = require("fs");
var PDFDocument = require('pdfkit');
var Account = /** @class */ (function () {
    function Account(customer) {
        this._customer = customer;
        this._transactions = [];
        this._overdraftAmount = 0;
    }
    Account.prototype.withdraw = function (amount) {
        var availableBalance = this.getBalance() + this._overdraftAmount;
        if (availableBalance >= amount) {
            this.createTransaction(amount, TRANSACTION_TYPE_1.TRANSACTION_TYPE.DEBIT, new Date());
        }
        else {
            throw new Error('Insufficient funds');
        }
    };
    Account.prototype.deposit = function (amount) {
        this.createTransaction(amount, TRANSACTION_TYPE_1.TRANSACTION_TYPE.CREDIT, new Date());
    };
    Account.prototype.requestOverdraft = function (amount) {
        if (amount <= 500) {
            this._overdraftAmount = amount;
        }
    };
    Account.prototype.getBalance = function () {
        var balance = 0;
        for (var _i = 0, _a = this._transactions; _i < _a.length; _i++) {
            var transaction = _a[_i];
            if (transaction.getType() === TRANSACTION_TYPE_1.TRANSACTION_TYPE.CREDIT) {
                balance = balance + transaction.getAmount();
            }
            if (transaction.getType() === TRANSACTION_TYPE_1.TRANSACTION_TYPE.DEBIT) {
                balance = balance - transaction.getAmount();
            }
        }
        return balance;
    };
    Account.prototype.createTransaction = function (amount, transactionType, date) {
        var transaction = new Transaction_1.Transaction(transactionType, amount, this, date);
        this._transactions.push(transaction);
    };
    Account.prototype.printBankStatement = function () {
        var bankStatement = BankStatement_1.BankStatement.generateBankStatement(this._transactions);
        console.log(bankStatement);
        return bankStatement;
    };
    Account.prototype.printBankStatementBetween = function (startDate, endDate) {
        var bankStatement = BankStatement_1.BankStatement.generateBankStatementBetweenDates(this._transactions, startDate, endDate);
        console.log(bankStatement);
        return bankStatement;
    };
    Account.prototype.generatePDF = function () {
        var doc = new PDFDocument();
        var writeStream = (0, fs_1.createWriteStream)('bank-statement.pdf');
        var date = new Date();
        doc.pipe(writeStream);
        doc
            .font('Courier', 25)
            .text('Bank Statement: ' +
            this._customer.getFirstName() +
            ' ' +
            this._customer.getLastName(), { align: 'center' });
        doc
            .fontSize(18)
            .text(date.getDate() + '/' + date.getMonth() + '/' + date.getFullYear(), {
            align: 'center',
        });
        doc.fontSize(18).text('\n\n');
        doc.fontSize(12).text(this.printBankStatement());
        doc.end();
        console.log('PDF generated successfully');
    };
    return Account;
}());
exports.Account = Account;
