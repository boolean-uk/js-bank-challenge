import { BankAccount, Transaction } from './BankStatement';
import * as fs from 'fs';



describe('BankAccount', () => {
  let bankAccount: BankAccount;

  beforeEach(() => {
    bankAccount = new BankAccount();
  });

  it('should handle deposits and withdrawals correctly', () => {
    bankAccount.deposit('10/01/2012', 1000);
    bankAccount.deposit('13/01/2012', 2000);
    bankAccount.withdraw('14/01/2012', 500);

    const expectedStatement = `date       || credit  || debit  || balance
10/01/2012 || 1000.00 ||         || 1000.00
13/01/2012 || 2000.00 ||         || 3000.00
14/01/2012 ||           || 500.00 || 2500.00`

    expect(bankAccount.printStatement()).toEqual(expectedStatement);
    console.log(expectedStatement)
  
  });


  it('should throw an error for an invalid withdrawal', () => {
    bankAccount.deposit('10/01/2012', 1000);

    expect(() => {
      bankAccount.withdraw('14/01/2012', 1500);
    }).toThrow('Insufficient funds for withdrawal.');
  });


  it('should throw an error for a withdrawal exceeding the available funds (with overdraft)', () => {
    bankAccount.deposit('10/01/2012', 1000);
    expect(() => {
      bankAccount.withdraw('14/01/2012', 2000);
    }).toThrow('Insufficient funds for withdrawal.');
  });

  it('should throw an error when withdrawing beyond the overdraft limit', () => {
    bankAccount.deposit('10/01/2012', 1000);
    expect(() => {
      bankAccount.withdraw('14/01/2012', 2500);
    }).toThrow('Insufficient funds for withdrawal.');
  });

  it('should handle multiple deposits and withdrawals', () => {
    bankAccount.deposit('10/01/2012', 1000);
    bankAccount.withdraw('14/01/2012', 500);
    bankAccount.deposit('15/01/2012', 200);
    bankAccount.withdraw('16/01/2012', 100);

    const expectedStatement = `date       || credit  || debit  || balance
10/01/2012 || 1000.00 ||         || 1000.00
14/01/2012 ||           || 500.00 || 500.00
15/01/2012 || 200.00 ||         || 700.00
16/01/2012 ||           || 100.00 || 600.00`;

    expect(bankAccount.printStatement()).toEqual(expectedStatement);
  });

  test('should generate and save a PDF statement', async () => {
  const bankAccount = new BankAccount();
  const transactions = [
    new Transaction('2023-07-20', 100, 'credit'),
    new Transaction('2023-07-21', 50, 'debit'),
    new Transaction('2023-07-22', 200, 'credit'),
    new Transaction('2023-07-23', 80, 'debit'),
    new Transaction('2023-07-24', 300, 'credit'),
  ];

  transactions.forEach((transaction) => {
    if (transaction.type === 'credit') {
      bankAccount.deposit(transaction.date, transaction.amount);
    } else {
      bankAccount.withdraw(transaction.date, transaction.amount);
    }
  });

  const outputPath = 'test_bank_statement.pdf';
  await bankAccount.generatePDFStatement(outputPath);

  const pdfTextContent = await fs.promises.readFile(outputPath, 'utf8');
});
});
