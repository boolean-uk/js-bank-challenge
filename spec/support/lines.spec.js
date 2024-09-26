const Account = require("../../src/account");
const Receipt = require("../../src/receipt");

describe("Lines", () => {
    it("Return an array of lines", () => {
        // set up
        const transactions = [
            { date: "06/04/2022", type: "credit", amount: 4000, balance: 4000 },
            { date: "06/04/2022", type: "credit", amount: 3000, balance: 7000 },
            { date: "06/04/2022", type: "credit", amount: 2000, balance: 9000 },
            { date: "06/04/2022", type: "debit", amount: 1000, balance: 8000 }
        ];

        const receipt = new Receipt(transactions);

        // const receipt = new Receipt(account.debit(1000));

        const expected = `||     date       ||  credit  || debit  || balance  ||
||   06/04/2022  ||          ||  1000.00  ||  8000.00    ||
||   06/04/2022  ||  2000.00    ||        ||  9000.00    ||
||   06/04/2022  ||  3000.00    ||        ||  7000.00    ||
||   06/04/2022  ||  4000.00    ||        ||  4000.00    ||`;

        // execute, verify

        expect(receipt.print()).toEqual(expected);
    });
});