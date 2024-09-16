import { CheckingBankAccount } from "../src/implementations/CheckingBankAccount";

describe("CheckingBankAccount", () => {
  it("should create a CheckingBankAccount object", () => {
    const overdraftLimit = 500;
    const account = new CheckingBankAccount(overdraftLimit);

    expect(account instanceof CheckingBankAccount).toBe(true);
  });

  it("should allow withdrawals within overdraft limit", () => {
    const overdraftLimit = 500;
    const account = new CheckingBankAccount(overdraftLimit);

    account.deposit(1000, new Date());
    expect(account.withdraw(600, new Date())).toBe(true);
  });

  it("should not allow withdrawals beyond overdraft limit", () => {
    const overdraftLimit = 500;
    const account = new CheckingBankAccount(overdraftLimit);

    account.deposit(1000, new Date());
    expect(account.withdraw(1600, new Date())).toBe(false);
  });
});
