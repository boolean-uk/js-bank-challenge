const Transaction = require("../src/transaction.js");

describe("transaction", () => {
  //TEST 1
  it("creates a transaction", () => {
    // setup
    const expected = {
      date: "06/04/2022",
      amount: 100,
      type: "credit",
      balance: 100,
    };
    const transaction = new Transaction("06/04/2022", 100, "credit", 100);
    // execute, verify
    expect(transaction.createTransaction()).toEqual(expected);
  });
});

//const statementLines = new StatementLines(transactions);
