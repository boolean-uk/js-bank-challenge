import { Account } from './Account';
import {Transaction} from "./Transaction";

describe('Account tests', () => {
    let account: Account;

    beforeEach(() => {
        account = new Account('Jan Lisek');
    });

    it('should not allow invalid deposits', () => {
        const result = account.depositMoney(-33);
        expect(result).toBe(false);
    });

    it('should allow valid deposits and update transaction history', () => {
        const initialTransactionHistorySize = account.transactionHistory.length;
        const depositAmount = 500;

        const result = account.depositMoney(depositAmount);

        expect(result).toBe(true);
        expect(account.transactionHistory.length).toBe(initialTransactionHistorySize + 1);
        expect(account.transactionHistory[initialTransactionHistorySize].amount).toBe(depositAmount);
    });

    it('should not allow withdrawals exceeding the balance', () => {
        const depositAmount = 1000;

        account.depositMoney(depositAmount);
        const initialTransactionHistorySize = account.transactionHistory.length;

        const result = account.withdrawMoney(2000);


        expect(result).toBe(false);
        expect(account.transactionHistory.length).toBe(initialTransactionHistorySize);
    });

    it('should allow withdrawals exceeding the balance if they are not exceeding allowed overdraft', () => {
        const depositAmount = 1000;

        account.depositMoney(depositAmount)
        const initialTransactionHistorySize = account.transactionHistory.length
        account.allowOverdraft(500)

        const result = account.withdrawMoney(1200);


        expect(result).toBe(true)
        expect(account.transactionHistory.length).toBe(initialTransactionHistorySize + 1);
    });

    it('should allow valid withdrawals and update transaction history', () => {
        const initialTransactionHistorySize = account.transactionHistory.length;
        const depositAmount = 1000;
        const withdrawAmount = 300;

        account.depositMoney(depositAmount);

        const result = account.withdrawMoney(withdrawAmount);

        expect(result).toBe(true);
        expect(account.transactionHistory.length).toBe(initialTransactionHistorySize + 2);
        expect(account.transactionHistory[initialTransactionHistorySize + 1].amount).toBe(withdrawAmount);
    });

    it('should calculate the correct balance after transactions', () => {
        account.depositMoney(1000);
        account.withdrawMoney(300);
        account.depositMoney(4000);

        const balance = account.calculateBalance();

        expect(balance).toBe(4700);
    });

    it("should return account history", () => {
        account.addTransaction(new Transaction(1000, 'deposit', new Date('2022-02-10')))
        account.addTransaction(new Transaction(2000, 'deposit', new Date('2022-02-12')))
        account.addTransaction(new Transaction(500, 'withdrawal', new Date('2022-02-13')))

        let result: string = account.generateBankStatement()
        const expected: string[] = []
        expected.push("date       ||  credit   ||   debit   || balance\n");
        expected.push("10/2/2022  || 1000.00   ||           || 1000.00\n");
        expected.push("12/2/2022  || 2000.00   ||           || 3000.00\n");
        expected.push("13/2/2022  ||           || 500.00    || 2500.00\n");

        expect(result).toBe(expected.join(""));
    });

    it("should return account history from oldest to newest even if transactions where added in wrong order",
        () => {
        account.addTransaction(new Transaction(1000, 'deposit', new Date('2022-02-10')))
            account.addTransaction(new Transaction(500, 'withdrawal', new Date('2022-02-13')))
            account.addTransaction(new Transaction(3000, 'deposit', new Date('2022-02-12')))


        let result: string = account.generateBankStatement()
        const expected: string[] = []
        expected.push("date       ||  credit   ||   debit   || balance\n");
        expected.push("10/2/2022  || 1000.00   ||           || 1000.00\n");
        expected.push("12/2/2022  || 3000.00   ||           || 4000.00\n");
        expected.push("13/2/2022  ||           || 500.00    || 3500.00\n");

        expect(result).toBe(expected.join(""));
    });

    it("should return account history between given dates", () => {
        account.addTransaction(new Transaction(500, 'deposit', new Date('2021-02-13')))
        account.addTransaction(new Transaction(500, 'deposit', new Date('2021-05-13')))
        account.addTransaction(new Transaction(1000, 'deposit', new Date('2022-02-10')))
        account.addTransaction(new Transaction(2000, 'deposit', new Date('2022-02-12')))
        account.addTransaction(new Transaction(500, 'withdrawal', new Date('2022-02-13')))
        account.addTransaction(new Transaction(500, 'withdrawal', new Date('2023-02-13')))
        account.addTransaction(new Transaction(500, 'withdrawal', new Date('2023-07-13')))

        let result: string = account.generateBankStatementBetweenDates(new Date('2022-01-01'), new Date('2022-12-31'))
        const expected: string[] = []
        expected.push("date       ||  credit   ||   debit   || balance\n");
        expected.push("10/2/2022  || 1000.00   ||           || 2000.00\n");
        expected.push("12/2/2022  || 2000.00   ||           || 4000.00\n");
        expected.push("13/2/2022  ||           || 500.00    || 3500.00\n");

        expect(result).toBe(expected.join(""));
    });
});
