"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Transfer = void 0;
var Transfer = /** @class */ (function () {
    function Transfer(amountOfMoney) {
        this._date = new Date();
        this._amountOfMoney = amountOfMoney;
    }
    Object.defineProperty(Transfer.prototype, "amountOfMoney", {
        get: function () {
            return this._amountOfMoney;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Transfer.prototype, "date", {
        get: function () {
            return this._date;
        },
        enumerable: false,
        configurable: true
    });
    return Transfer;
}());
exports.Transfer = Transfer;
