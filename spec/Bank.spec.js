const { Transaction } = require("../src/Bank.js");

describe("Transcation class", () => {
  let transaction;
  beforeEach(() => {
    transaction = new Transaction();
  });
  it("can deposit money into the bank account", () => {
    transaction.deposit(100, "13/06/2024");
    const result = transaction.printStatement();

    expect(result).toEqual(
      "date || credit || debit || balance\n13/06/2024 100 100"
    );
  });
  it("can withdraw money out of the bank account", () => {
    transaction.withdraw(10, "14/06/2024");
    const result = transaction.printStatement();

    expect(result).toEqual(
      "date || credit || debit || balance\n14/06/2024 10 -10"
    );
  });
});
describe("Account Statement", () => {
  it("can print out transcation history", () => {
    const transaction = new Transaction();
    transaction.deposit(1000, "12/06/2024");
    transaction.withdraw(300, "13/06/2024");
    const result = transaction.printStatement();
    expect(result).toEqual(
      "date || credit || debit || balance\n12/06/2024 1000 1000\n13/06/2024 300 700"
    );
  });
});
