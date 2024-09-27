const StatementLines = require("../src/statementLines.js");

describe("statement lines", () => {
  //TEST 1
  it("creates a lines for the statement", () => {
    // setup
    const transactions = [
      {
        amount: 50,
        date: "10-01-2012",
        balance: 50,
        type: "credit",
      },
    ];

    const statementLines = new StatementLines(transactions);
    const expected = "10-01-2012  ||  50  ||  credit  ||  50\n";
    // execute, verify
    expect(statementLines.createLines()).toEqual(expected);
  });
});
