const BankAccount = require("../src/bankAccount.js");
const Transaction = require("../src/tx.js");
const Printer = require("../src/printer.js");

describe("BankAccount", () => {
  let bankAccount;

  beforeEach(() => {
    bankAccount = new BankAccount();
  });

  it("Checks the balance of the new account instance", () => {
    // setup
    const expected = 0;
    // execute
    const result = bankAccount.checkBalance();
    // verify
    expect(result).toEqual(expected);
  });

  it("Receives a deposit in the new account instance", () => {
    // setup
    const expected = 1000;
    bankAccount.depositFunds(1000);
    // execute
    const result = bankAccount.checkBalance();
    // verify
    expect(result).toEqual(expected);
  });

  it("Can deal with withdrawing money from the new account instance", () => {
    // setup
    const expected = 500;
    // execute
    bankAccount.depositFunds(1000);
    bankAccount.withdrawFunds(500);
    const result = bankAccount.checkBalance();
    // verify
    expect(result).toEqual(expected);
  });

  it("Throws an error if the deposit or withdrawal amount is negative", () => {
    // setup
    const error = new Error("You can't withdraw a negative amount.");
    const error2 = new Error("You can't deposit a negative amount.");
    // execute
    const errorTest = () => bankAccount.withdrawFunds(-10);
    const errorTest2 = () => bankAccount.depositFunds(-10);
    // verify
    expect(errorTest).toEqual(error);
    expect(errorTest2).toEqual(error2);
  });

  it("Throws an error if the withdrawal amount is greater than the balance available", () => {
    // setup
    const error = new Error("You can't withdraw more than your balance.");
    // execute
    const errorTest = () => bankAccount.withdrawFunds(1000);
    // verify
    expect(errorTest).toEqual(error);
  });
});
