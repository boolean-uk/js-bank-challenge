"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Account = void 0;
var Deposit_1 = require("./Deposit");
var Withdraw_1 = require("./Withdraw");
var Account = /** @class */ (function () {
    function Account(accountNum) {
        this._accountNum = accountNum;
        this._transactions = [];
    }
    Object.defineProperty(Account.prototype, "accountNum", {
        get: function () {
            return this._accountNum;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Account.prototype, "transactions", {
        get: function () {
            return this._transactions;
        },
        enumerable: false,
        configurable: true
    });
    Account.prototype.deposit = function (amountOfMoney) {
        this._transactions.push(new Deposit_1.Deposit(amountOfMoney));
    };
    Account.prototype.checkIfHasEnoughMoney = function (amountOfMoney) {
        if (this.calculateBalance() < amountOfMoney) {
            throw new Error("Not enough money!");
        }
    };
    Account.prototype.withdraw = function (amountOfMoney) {
        this.checkIfHasEnoughMoney(amountOfMoney);
        this._transactions.push(new Withdraw_1.Withdraw(amountOfMoney));
    };
    Account.prototype.calculateBalance = function () {
        var balance = 0;
        for (var i = 0; i < this._transactions.length; i++) {
            if (this._transactions[i] instanceof Withdraw_1.Withdraw) {
                balance -= this._transactions[i].amountOfMoney;
            }
            else
                balance += this._transactions[i].amountOfMoney;
        }
        return balance;
    };
    Account.prototype.generateBankStatements = function (startDate, endDate) {
        var tableHeaders = ['Date', 'Credit', 'Debit', 'Balance'];
        var headerRow = tableHeaders.map(function (header) { return header.padEnd(12); }).join('');
        var debit, credit, date, sum = 0;
        var tableData = this.transactions.map(function (trasaction) {
            if (trasaction.date >= startDate && trasaction.date <= endDate) {
                date = trasaction.date.toLocaleDateString();
                if (trasaction instanceof Withdraw_1.Withdraw) {
                    debit = 0;
                    credit = trasaction.amountOfMoney / 100.0;
                    sum -= trasaction.amountOfMoney / 100.0;
                }
                else if (trasaction instanceof Deposit_1.Deposit) {
                    credit = 0;
                    debit = trasaction.amountOfMoney / 100.0;
                    sum += trasaction.amountOfMoney / 100.0;
                }
                return "".concat(date.padEnd(12)).concat(credit.toString().padEnd(12)).concat(debit.toString().padEnd(12)).concat(sum.toString(), "\n");
            }
        });
        return headerRow + '\n' + tableData.join('');
    };
    return Account;
}());
exports.Account = Account;
