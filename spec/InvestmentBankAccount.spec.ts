import { InvestmentBankAccount } from "../src/implementations/InvestmentBankAccount";

describe("InvestmentBankAccount", () => {
  it("should create an InvestmentBankAccount object", () => {
    const account = new InvestmentBankAccount();

    expect(account instanceof InvestmentBankAccount).toBe(true);
  });

  it("should accumulate interest on the first day of the month", () => {
    const account = new InvestmentBankAccount();
    account.deposit(1000, new Date("2023-01-01"));
    account.deposit(2000, new Date("2023-01-10"));
    account.deposit(3000, new Date("2023-01-21"));
    account.accumulateInterest(5, new Date("2023-02-01"));

    expect(account.getTransactions().length).toBe(4);
    expect(account.getTransactions()[3].getAmount()).toBeCloseTo(180, 2);
  });

  it("should accumulate interest with respect to deposits and withdraws", () => {
    const account = new InvestmentBankAccount();
    account.deposit(1000, new Date("2023-01-01"));
    account.withdraw(500, new Date("2023-01-07"));
    account.deposit(4200, new Date("2023-01-22"));
    account.accumulateInterest(5, new Date("2023-02-01"));

    expect(account.getTransactions().length).toBe(4);
    expect(account.getTransactions()[3].getAmount()).toBeCloseTo(100.83, 2);
  });

  it("should not accumulate interest on any other day than the first day of the month", () => {
    const account = new InvestmentBankAccount();
    account.deposit(1000, new Date("2023-01-01"));
    account.withdraw(500, new Date("2023-01-07"));
    account.deposit(4200, new Date("2023-01-22"));
    account.accumulateInterest(5, new Date("2023-04-02"));

    expect(account.getTransactions().length).toBe(3);
  });
});
