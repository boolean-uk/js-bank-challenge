import { SavingsBankAccount } from "../src/implementations/SavingsBankAccount";

describe("SavingsBankAccount", () => {
  it("should create a SavingsBankAccount object", () => {
    const depositLimitPerYear = 5000;
    const account = new SavingsBankAccount(depositLimitPerYear);

    expect(account instanceof SavingsBankAccount).toBe(true);
  });

  it("should allow deposits within yearly deposit limit", () => {
    const depositLimitPerYear = 5000;
    const account = new SavingsBankAccount(depositLimitPerYear);

    expect(account.deposit(4000, new Date())).toBe(true);
    expect(account.deposit(1000, new Date())).toBe(true);
  });

  it("should not allow deposits beyond yearly deposit limit", () => {
    const depositLimitPerYear = 5000;
    const account = new SavingsBankAccount(depositLimitPerYear);

    expect(account.deposit(6000, new Date())).toBe(false);
  });
});
