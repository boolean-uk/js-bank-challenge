const Statement = require("../src/statement.js");

describe("Statement", () => {
  let statement;
  beforeEach(() => {
    statement = new Statement();
  });

  it("prints the entire transaction", () => {
    //setup
    const transactions = [
      { date: "14-01-2012", credit: "  ", debit: "500.00", balance: "2500.00" },
      {
        date: "13-01-2012",
        credit: 2000.0,
        debit: "  ",
        balance: "3000.00",
      },
      {
        date: "10-01-2012",
        credit: "1000.00",
        debit: "  ",
        balance: "1000.00",
      },
    ];

    const result = statement.print(transactions);
    // verify
    expect(result).toBe(
      "date || credit || debit || balance\n14-01-2012 ||    || 500.00 || 2500.00\n13-01-2012 || 2000 ||    || 3000.00\n10-01-2012 || 1000.00 ||    || 1000.00\n"
    );
  });
});
