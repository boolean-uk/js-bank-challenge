import { Account } from "../src"

describe('account tests', () => {
    let account: Account

    beforeEach(() => {
        account = new Account()
        
    })

    it('should return true and update balance after deposit certain amount of money', () => {
        const depositAmount = 1000;

        const depositResult = account.deposit(depositAmount);
        const balanceResult = account.getBalance();

        expect(depositResult).toEqual(true);
        expect(balanceResult).toEqual(depositAmount);
    })

    it('should return false and not update balance after deposit invalid amount of money', () => {
        const depositAmount1 = 1000;
        const depositAmount2 = -500;

        account.deposit(depositAmount1);
        const depositResult = account.deposit(depositAmount2);
        const balanceResult = account.getBalance();

        expect(depositResult).toEqual(false);
        expect(balanceResult).toEqual(depositAmount1);
    })

    it('should return false and not update balance after withdraw invalid amount of money', () => {
        const depositAmount = 1000;
        const withdrawAmount = -500;

        account.deposit(depositAmount);
        const withdrawResult = account.withdraw(withdrawAmount);
        const balanceResult = account.getBalance();

        expect(withdrawResult).toEqual(false);
        expect(balanceResult).toEqual(depositAmount);
    })

    it('should return false and not update balance after trying withdraw amount > balance', () => {
        const depositAmount = 1000;
        const withdrawAmount1 = 200;
        const withdrawAmount2 = 801;
        const expectedBalance = depositAmount - withdrawAmount1

        account.deposit(depositAmount);
        account.withdraw(withdrawAmount1);
        const withdrawResult = account.withdraw(withdrawAmount2);
        const balanceResult = account.getBalance();

        expect(withdrawResult).toEqual(false);
        expect(balanceResult).toEqual(expectedBalance);
    })

    it('should return generated statement', () => {
        const depositAmount1 = 1000;
        const depositAmount2 = 2000;
        const withdrawAmount = 500;

        const actualDate = new Date();
        const day = actualDate.getDay() > 9 ? actualDate.getDay() : `0${actualDate.getDay()}`
        const month = actualDate.getDay() > 9 ? actualDate.getDay() : `0${actualDate.getDay()}`
        const year = actualDate.getFullYear()

        let expectedStatement = `date       || credit  || debit  || balance\n`
        expectedStatement += `${day}/${month}/${year} ||         || 500.00 || 2500.00\n`
        expectedStatement += `${day}/${month}/${year} || 2000.00 ||        || 3000.00\n`
        expectedStatement += `${day}/${month}/${year} || 1000.00 ||        || 1000.00`

        account.deposit(depositAmount1);
        account.deposit(depositAmount2);
        account.withdraw(withdrawAmount);

        const generatedStatement = account.generateStatement();

        expect(generatedStatement).toEqual(expectedStatement);
    })

    it('should return generated statement for given dates', () => {
        const depositAmount1 = 1000;
        const depositAmount2 = 2000;
        const withdrawAmount = 500;

        const actualDate = new Date();
        const day = actualDate.getDay() > 9 ? actualDate.getDay() : `0${actualDate.getDay()}`
        const month = actualDate.getDay() > 9 ? actualDate.getDay() : `0${actualDate.getDay()}`
        const year = actualDate.getFullYear()

        let expectedStatement1 = `date       || credit  || debit  || balance\n`
        expectedStatement1 += `${day}/${month}/${year} ||         || 500.00 || 2500.00\n`
        expectedStatement1 += `${day}/${month}/${year} || 2000.00 ||        || 3000.00\n`
        expectedStatement1 += `${day}/${month}/${year} || 1000.00 ||        || 1000.00`

        let expectedStatement2 = `date       || credit  || debit  || balance\n`

        account.deposit(depositAmount1);
        account.deposit(depositAmount2);
        account.withdraw(withdrawAmount);

        const generatedStatement1 = account.generateStatementWithDates(actualDate.getMilliseconds() - 86400000, actualDate.getMilliseconds() + 86400000);

        const generatedStatement2 = account.generateStatementWithDates(actualDate.getMilliseconds() - 86400000 * 2, actualDate.getMilliseconds() - 86400000);

        expect(generatedStatement1).toEqual(expectedStatement1);
        expect(generatedStatement2).toEqual(expectedStatement2);
    })

    it('should allow 500 overdraft after requesting it', () => {
        const depositAmount1 = 1000;
        const depositAmount2 = 2000;
        const withdrawAmount = 3500;
        const expectedResult1 = depositAmount1 + depositAmount2
        const expectedResult2 = depositAmount1 + depositAmount2 - withdrawAmount

        account.deposit(depositAmount1);
        account.deposit(depositAmount2);
        const withdrawResult1 = account.withdraw(withdrawAmount);
        const balanceResult1 = account.getBalance()

        account.requestOverdraft()
        const withdrawResult2 = account.withdraw(withdrawAmount);
        const balanceResult2 = account.getBalance()

        expect(withdrawResult1).toEqual(false);
        expect(balanceResult1).toEqual(expectedResult1);

        expect(withdrawResult2).toEqual(true);
        expect(balanceResult2).toEqual(expectedResult2);
    })
})