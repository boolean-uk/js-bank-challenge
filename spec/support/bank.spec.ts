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
  });

  it('should not deposit negative or zero amount', () => {
    const negativeAmount = -100;
    const zeroAmount = 0;
    const date = new Date('2023-07-24');
    expect(bankAccount.deposit(negativeAmount, date)).toBe(false);
    expect(bankAccount.deposit(zeroAmount, date)).toBe(false);
  });

  it('should withdraw money and update the balance', () => {
    bankAccount.deposit(2000, new Date('2023-07-24'));
    const withdrawalAmount = 500;
    const date = new Date('2023-07-25');
    const result = bankAccount.withdraw(withdrawalAmount, date);
    expect(result).toBe(true);
  });

  it('should not withdraw negative amount or more than the balance', () => {
    bankAccount.deposit(1000, new Date('2023-07-24'));
    const negativeAmount = -100;
    const moreThanBalance = 2000;
    const date = new Date('2023-07-25');
    expect(bankAccount.withdraw(negativeAmount, date)).toBe(false);
    expect(bankAccount.withdraw(moreThanBalance, date)).toBe(false);
  });

  it('should display the correct account history', () => {
    bankAccount.deposit(1000, new Date('2023-07-24'));
    bankAccount.deposit(2000, new Date('2023-07-25'));
    bankAccount.withdraw(500, new Date('2023-07-26'));
    const expectedHistory = `date        || credit    || debit     || balance\n7/24/2023   ||  1000.00  ||           || 1000.00\n7/25/2023   ||  2000.00  ||           || 3000.00\n7/26/2023   ||           ||   500.00  || 2500.00\n`;
    expect(bankAccount.showAccountHistory()).toBe(expectedHistory);

  });
  it('should display the correct account history between two dates (transactions not in order)', () => {
    bankAccount.deposit(1000, new Date('2023-07-24'));
    bankAccount.deposit(2000, new Date('2023-07-25'));
    bankAccount.deposit(1500, new Date('2023-07-27'));
    bankAccount.withdraw(500, new Date('2023-07-26'));
    bankAccount.withdraw(1000, new Date('2023-07-28'));
    const startDate = new Date('2023-07-25');
    const endDate = new Date('2023-07-27');
    const accountHistory = bankAccount.showAccountHistoryBetweenTwoDates(startDate, endDate);
    const expectedHistory = `date        || credit    || debit     || balance
7/25/2023   ||  2000.00  ||           || 3000.00
7/26/2023   ||           ||   500.00  || 2500.00
7/27/2023   ||  1500.00  ||           || 4000.00
`;

    expect(accountHistory).toBe(expectedHistory);
  });

  it('should return "Wrong dates" when the start date is after the end date', () => {
    const startDate = new Date('2023-07-28');
    const endDate = new Date('2023-07-27');
    const accountHistory = bankAccount.showAccountHistoryBetweenTwoDates(startDate, endDate);
    expect(accountHistory).toBe('Wrong dates');
  });


  it('should not withdraw if withdrawal amount exceeds available funds - extension 2', () => {
    bankAccount.deposit(1000, new Date('2023-07-24'));
    const withdrawalAmount = 2000;
    const date = new Date('2023-07-25');
    const result = bankAccount.withdraw(withdrawalAmount, date);
    expect(result).toBe(false);
  });

  it('should allow withdrawal if withdrawal amount is within available funds - extension 2', () => {
    bankAccount.deposit(1000, new Date('2023-07-24'));
    const withdrawalAmount = 500;
    const date = new Date('2023-07-25');
    const result = bankAccount.withdraw(withdrawalAmount, date);
    expect(result).toBe(true);
  });
});