const Account = require("../../src/account");

describe("Bank challenge", () => {
    it("Given a account account with deposits and withdrawals, check balance", () => {
        // set up
        const account = new Account();

        // execute
        account.credit(3000);
        account.debit(500);
        account.credit(2000);
        account.credit(1000);

        const expectedBalance = 5500;

        const resultBalance =
            account.transactions[account.transactions.length - 1].balance;

        expect(resultBalance).toEqual(expectedBalance);
    });

    describe("deposit", () => {
        it("Returns value after several deposits", () => {
            const account = new Account();

            account.credit(1000);
            account.credit(1000);
            account.credit(1000);

            const expected = 3000;

            const result =
                account.transactions[account.transactions.length - 1].balance;

            expect(result).toEqual(expected);
        });
    });

    describe("deposit", () => {
        it("credit throws an error if amount is incorrect", () => {
            const account = new Account();

            account.credit(1000);
            account.credit(1000);
            account.credit(1000);

            expect(() => account.credit().toThrowError(`Enter valid amount`));
            expect(() => account.credit("string").toThrowError(`Enter valid amount`));
        });
    });

    describe("account credit() and debit()", () => {
        it("Returns value after several deposits and debit", () => {
            const account = new Account();

            account.credit(1000);
            account.credit(1000);
            account.credit(1000);
            account.debit(1000);

            const expected = 2000;

            const result =
                account.transactions[account.transactions.length - 1].balance;

            expect(result).toEqual(expected);
        });
    });

    describe("account credit() and debit()", () => {
        it("deposit throws an error if amount is incorrect", () => {
            const account = new Account();

            account.credit(1000);
            account.credit(1000);
            account.credit(1000);

            expect(() => account.debit().toThrowError(`Enter valid amount`));
            expect(() => account.debit("string").toThrowError(`Enter valid amount`));
        });
    });

    describe("account credit() and debit()", () => {
        it("throws an error if amount debited is more than account balance ", () => {
            const account = new Account();

            account.credit(1000);
            account.credit(1000);
            account.credit(1000);

            expect(() =>
                account.debit(100000000000000).toThrowError(`Enter valid amount`)
            );
        });
    });
});