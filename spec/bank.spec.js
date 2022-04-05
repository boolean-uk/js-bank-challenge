const Bank = require("../src/bank.js");

describe("Bank", () => {
  let bank;
  beforeEach(() => {
    bank = new Bank();
  });

  it("adds a new transaction", () => {
    // setup
    bank.deposit(500, "14/01/2012");
    // verify
    expect(bank.transactions.length).toEqual(1);
  });

  it("returns a message how much you have deposited", () => {
    // setup
    const result = bank.deposit(500, "14/01/2012");
    // verify
    expect(result).toEqual("You have deposited £500");
  });

  //   it("throws an error because of invalid amount", () => {
  //     // verify
  //     expect(bank.deposit(0, "14/01/2012")).toThrowError("Amount not valid");
  //   });

  it("adds deposit of 500 to balance", () => {
    // setup
    bank.deposit(500, "14/01/2012");
    // execute
    expect(bank.balance).toEqual(2500);
  });

  it("adds a new transaction", () => {
    // setup
    bank.withdrawal(200, "21/01/2012");
    // verify
    expect(bank.transactions.length).toEqual(1);
  });

  it("returns a message how much you have withdrawed", () => {
    // setup
    const result = bank.withdrawal(200, "21/01/2012");
    // verify
    expect(result).toEqual("You have withdrawed £200");
  });

  it("subtracts credit of 200 from balance", () => {
    // setup
    bank.withdrawal(200, "21/01/2012");
    // execute
    expect(bank.balance).toEqual(1800);
  });
});
