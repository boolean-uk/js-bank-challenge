const BankAccount = require("../src/bankaccount.js");

describe("Bank Account", () => {
  let bankAccount;

  beforeEach(() => {
    bankAccount = new BankAccount();
  });

  describe("deposit()", () => {
    it("can deposit money to bank account", () => {
      bankAccount.deposit(100, "01/01/2022");

      expect(bankAccount.balance).toEqual(100);
      expect(bankAccount.transactionHistory.length).toEqual(1);
      expect(bankAccount.transactionHistory[0].amount).toEqual(100);
      expect(bankAccount.transactionHistory[0].type).toEqual("credit");
    });
  });

  describe("withdraw()", () => {
    it("can withdraw money from bank account", () => {
      bankAccount.deposit(100, "01/01/2022");
      bankAccount.withdraw(10, "02/01/2022");

      expect(bankAccount.balance).toEqual(90);
      expect(bankAccount.transactionHistory.length).toEqual(2);
      expect(bankAccount.transactionHistory[1].type).toEqual("debit");
    });
  });

  describe("printStatement()", () => {
    it("can print transaction history from bank account", () => {
      bankAccount.deposit(100, "01/01/2022");
      bankAccount.withdraw(10, "02/01/2022");
      const result = `date       || credit    || debit     || balance\n02/01/2022 || || 10.00 || 90.00\n01/01/2022 || 100.00 || || 100.00\n`;

      expect(bankAccount.printStatement()).toEqual(result);
    });
  });
});
