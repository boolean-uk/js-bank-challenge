import { Account } from "../account"
import { Account_Transaction } from "../accountTransaction"

describe("account tests", () => {
    let account: Account

    beforeEach(() => { 
        account = new Account()
    })

    it("should not add funds, funds number is negatice", () => {
        expect(() => account.addFunds(-100)).toThrowError("Funds number cannot be negative");
    })

    it("should add funds, funds number is positive", () => {
        const fundsToAdd = 100
        account.addFunds(fundsToAdd);
        expect(account.getBalance()).toBe(fundsToAdd);
    })

    it("should balance be 600", () => {
        const fundsToAdd = 600
        account.addFunds(fundsToAdd);
        expect(account.getBalance()).toBe(fundsToAdd);
    })

    it("should balance be 0", () => {
        expect(account.getBalance()).toBe(0);
    })

    it("should not get funds, balance after transaction would be negative", () => {
        expect(() => account.getFunds(100)).toThrowError("Balance after transaction would be negative");
    })

    it("should get funds, balance after transaction would be positive", () => {
        const fundsToAdd = 100
        const fundsToGet = 50
        account.addFunds(fundsToAdd);
        account.getFunds(fundsToGet);
        expect(account.getBalance()).toBe(fundsToAdd - fundsToGet);
    })

    it("should return only transactions between chosen time period", () => {
        const startDate = new Date(2023, 1, 1)
        const endDate = new Date(2023, 3, 25)
        const accountTransactionsList : Array<Account_Transaction> = [
            new Account_Transaction(new Date(2022,1,2), "credit", 100),
            new Account_Transaction(new Date(2023,1,20), "debit", 50),
            new Account_Transaction(new Date(2023,3,24), "credit", 200),
            new Account_Transaction(new Date(2023,3,26), "debit", 150),
            new Account_Transaction(new Date(2023,2,26), "debit", 150)
        ]

        account.accountTransactionList = accountTransactionsList;
        const accountTransactionsListByTimePeriod = account.createTransactionListBetweenTimePeriod(startDate, endDate);

        const expectedTransactions = [
            new Account_Transaction(new Date(2023, 1, 20), "debit", 50),
            new Account_Transaction(new Date(2023, 3, 24), "credit", 200),
            new Account_Transaction(new Date(2023, 2, 26), "debit", 150),
          ];
      
        expect(accountTransactionsListByTimePeriod).toEqual(expectedTransactions);
    });
})