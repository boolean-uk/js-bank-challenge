import { Bank, TransactionType } from '../../src/Bank'

describe("Bank", () => {
  let bankAccount: Bank;

  beforeEach(() => {
    bankAccount = new Bank();
  })

  it('should deposit money and update the balance', () => {
    const depositAmount = 1000;
    const date = new Date('2023-07-24');
    const result = bankAccount.deposit(depositAmount, date);
    expect(result).toBe(true);
    expect(bankAccount.showAccountHistory()).toContain(`|| ${depositAmount.toFixed(2)}  ||`);
    expect(bankAccount.showAccountHistory()).toContain(`|| ${depositAmount.toFixed(2)}\n`);
    expect(bankAccount.showAccountHistory()).toContain(`|| ${depositAmount.toFixed(2)}  || 1000.00\n`);
  });

  it('should not deposit negative or zero amount', () => {
    const negativeAmount = -100;
    const zeroAmount = 0;
    const date = new Date('2023-07-24');
    expect(bankAccount.deposit(negativeAmount, date)).toBe(false);
    expect(bankAccount.deposit(zeroAmount, date)).toBe(false);
    expect(bankAccount.showAccountHistory()).not.toContain(`|| ${negativeAmount.toFixed(2)}  ||`);
    expect(bankAccount.showAccountHistory()).not.toContain(`|| ${zeroAmount.toFixed(2)}  ||`);
  });

  it('should withdraw money and update the balance', () => {
    bankAccount.deposit(2000, new Date('2023-07-24'));
    const withdrawalAmount = 500;
    const date = new Date('2023-07-25');
    const result = bankAccount.withdraw(withdrawalAmount, date);
    expect(result).toBe(true);
    expect(bankAccount.showAccountHistory()).toContain(`|| ${withdrawalAmount.toFixed(2)}  ||`);
    expect(bankAccount.showAccountHistory()).toContain(`||   ${withdrawalAmount.toFixed(2)}  || 1500.00\n`);
  });

  it('should not withdraw negative amount or more than the balance', () => {
    bankAccount.deposit(1000, new Date('2023-07-24'));
    const negativeAmount = -100;
    const moreThanBalance = 2000;
    const date = new Date('2023-07-25');
    expect(bankAccount.withdraw(negativeAmount, date)).toBe(false);
    expect(bankAccount.withdraw(moreThanBalance, date)).toBe(false);
    expect(bankAccount.showAccountHistory()).not.toContain(`|| ${negativeAmount.toFixed(2)}  ||`);
    expect(bankAccount.showAccountHistory()).not.toContain(`||   ${moreThanBalance.toFixed(2)}  ||`);
  });

  it('should display the correct account history', () => {
    bankAccount.deposit(1000, new Date('2023-07-24'));
    bankAccount.deposit(2000, new Date('2023-07-25'));
    bankAccount.withdraw(500, new Date('2023-07-26'));
    const expectedHistory = `date        || credit    || debit     || balance\n2023-07-24  ||  1000.00  ||           || 1000.00\n2023-07-25  ||  2000.00  ||           || 3000.00\n2023-07-26  ||           ||   500.00  || 2500.00\n`;
    expect(bankAccount.showAccountHistory()).toBe(expectedHistory);
  });
});