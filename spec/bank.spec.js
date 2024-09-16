const Bank = require("../src/bank.js");

describe("Bank", () => {
  let bank;
  beforeEach(() => {
    bank = new Bank();
  });

  it("adds a new transaction", () => {
    // setup
    bank.deposit(500, "14-01-2012");
    // verify
    expect(bank.transactions.length).toEqual(1);
  });

  it("returns a message how much you have deposited", () => {
    // setup
    const result = bank.deposit(500, "14-01-2012");
    // verify
    expect(result).toEqual("You have deposited £500.00");
  });

  it("throws an error because of invalid amount", () => {
    let result = null;
    try {
      result = bank.deposit(0, "14-01-2012");
    } catch (error) {
      result = error;
    }
    expect(result).toEqual(new Error("Amount not valid"));
    // verify
    expect(() => {
      bank.deposit(0, "14/01/2012");
    }).toThrowError("Amount not valid");
  });

  it("adds deposit of 500 to balance", () => {
    // setup
    bank.deposit(500, "14-01-2012");
    // execute
    expect(bank.balance).toEqual(2500);
  });

  it("adds a new transaction", () => {
    // setup
    bank.withdrawal(200, "21-01-2012");
    // verify
    expect(bank.transactions.length).toEqual(1);
  });

  it("returns a message how much you have withdrawed", () => {
    // setup
    const result = bank.withdrawal(200, "21-01-2012");
    // verify
    expect(result).toEqual("You have withdrawed £200.00");
  });

  it("subtracts credit of 200 from balance", () => {
    // setup
    bank.withdrawal(200, "21-01-2012");
    // execute
    expect(bank.balance).toEqual(1800);
  });

  it("prints out the entire transaction through Bank class", () => {
    // setup
    bank.deposit(500, "14-01-2012");
    bank.withdrawal(200, "21-01-2012");
    bank.deposit(1000, "20-01-2012");

    const result = bank.print();
    // execute
    expect(result).toEqual(
      "date || credit || debit || balance\n14/01/2012 ||     || 500.00 || 2500.00\n21/01/2012 || 200.00 ||    || 2300.00\n20/01/2012 ||     || 1000.00 || 3300.00\n"
    );
  });
});
