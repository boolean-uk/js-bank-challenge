import { Savings_account } from "../savings_account"
import { Account_Transaction } from "../accountTransaction"

describe("checking account tests", () => {
    let savings_account: Savings_account

    beforeEach(() => { 
        savings_account = new Savings_account()
    })

    it("should add funds, deposit limit per year not exceeded", () => {
        savings_account.addFunds(20000);
        expect(savings_account.getBalance()).toBe(20000);
    })

    it("should not add funds, deposit limit per year exceeded", () => {
        expect(() => savings_account.addFunds(20001)).toThrowError("You cannot add more than " + savings_account.depositLimitPerYear + " in a year");
    })

    it("should add funds, deposit limit per year not exceeded, transaction from previos year not included", () => {
        const accountTransactionsList : Array<Account_Transaction> = [
            new Account_Transaction(new Date(2020,1,2), "credit", 20000),
        ]
        savings_account.accountTransactionList = accountTransactionsList;
        expect(() => savings_account.addFunds(20000)).not.toThrowError("You cannot add more than " + savings_account.depositLimitPerYear + " in a year");
    })

    it("should not add funds, deposit limit per year exceeded, changes in balance not included", () => {
        savings_account.addFunds(5000)
        savings_account.getFunds(3000)
        expect(() => savings_account.addFunds(18000)).toThrowError("You cannot add more than " + savings_account.depositLimitPerYear + " in a year");
    })
})