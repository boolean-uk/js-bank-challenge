const Statement = require("../src/statement.js");

describe("Statement", () => {
  it("can format a statement from transactions", () => {
    // setup
    const transactions = [
      {
        amount: 50,
        date: "10/01/2012",
        balance: 50,
        type: "credit",
      },
      {
        amount: 10,
        date: "11/01/2012",
        balance: 40,
        type: "debit",
      },
    ];
    const statement = new Statement(transactions);
    const expected = `date       || credit    || debit     || balance\n11/01/2012 || || 10.00 || 40.00\n10/01/2012 || 50.00 || || 50.00\n`;
    // execute, verify
    expect(statement.print()).toEqual(expected);
  });
});
