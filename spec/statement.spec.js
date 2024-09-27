const Bank = require("../src/bank.js");
const Statement = require("../src/statement.js");

describe("statement", () => {
  //TEST 1
  it("creates and returns statement", () => {
    // setup
    const transactions = [
      {
        amount: 50,
        date: "10-01-2012",
        balance: 50,
        type: "credit",
      },
      {
        amount: 10,
        date: "11-01-2012",
        balance: 40,
        type: "debit",
      },
    ];

    const statement = new Statement(transactions);
    const expected =
      "date  ||  credit  ||  debit  ||  balance\n10-01-2012  ||  50  ||  credit  ||  50\n11-01-2012  ||  10  ||  debit  ||  40\n";
    // execute, verify
    expect(statement.print()).toEqual(expected);
  });
});
