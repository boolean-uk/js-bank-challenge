import SavingsAccount, { InvestmentAccount, CheckingAccount } from "../src/index.js";
import currency from "currency.js"
import { addDays } from "date-fns"

describe('Bank account', () => {
    let savingsAccount
    let investmentAccount
    let checkingAccount

    beforeEach(() => {
        savingsAccount = new SavingsAccount()
        checkingAccount = new CheckingAccount()
        investmentAccount = new InvestmentAccount()
    })

    it('should exist', () => {
        expect(checkingAccount).toBeInstanceOf(CheckingAccount)
        expect(checkingAccount.balance).toBe(0)
    })

    it('should be able to deposit money', () => {
        checkingAccount.deposite(1000)

        expect(checkingAccount.balance).toEqual(currency(1000.00))
    })

    it('should be able to withdraw money', () => {
        checkingAccount.deposite(1000)
        checkingAccount.withdraw(500)

        expect(checkingAccount.balance).toEqual(currency(500.00))
    })

    it('should be able to print a statement', () => {
        let date = new Date()
        date = date.toLocaleDateString()

        checkingAccount.deposite(1000)
        checkingAccount.deposite(2000)
        checkingAccount.withdraw(500)

        const result = checkingAccount.getStatement()

        expect(result).toBe(`date || credit || debit || balance || overdraft\n${date} ||  || 500.00 || 2500.00 || 0\n${date} || 2000.00 ||  || 3000.00 || 0\n${date} || 1000.00 ||  || 1000.00 || 0\n`)
    })

    it('should not be possible to withdrawl more than is in the account', () => {
        checkingAccount.deposite(1000)

        expect(() => checkingAccount.withdraw(1200)).toThrow('Amount exceeds the available funds')
    })

    it('should be possible to add an overdraft to the checking account', () => {
        checkingAccount.deposite(1000)
        checkingAccount.addOverdraft(1000)
        checkingAccount.withdraw(1200)

        expect(checkingAccount.balance)
    })

    it('should not be possible to withdrawl more than the overdraft allows', () => {
        checkingAccount.deposite(1000)
        checkingAccount.addOverdraft(1000)

        expect(() => checkingAccount.withdraw(2200)).toThrow('Amount exceeds the available funds')
    })

    it('should be able to print a statement with overdraft', () => {
        let date = new Date()
        date = date.toLocaleDateString()

        checkingAccount.deposite(1000)
        checkingAccount.addOverdraft(1000)
        checkingAccount.withdraw(1200)

        const result = checkingAccount.getStatement()

        expect(result).toBe(`date || credit || debit || balance || overdraft\n${date} ||  || 1200.00 || -200.00 || 1000.00\n${date} || 1000.00 ||  || 1000.00 || 1000.00\n`)
    })

    it('should be able to print a statement between two dates', () => {
        const date1 = new Date(2024, 5, 12)
        const date2 = addDays(new Date(), 10)

        let date = new Date()
        date = date.toLocaleDateString()

        checkingAccount.deposite(1000)
        checkingAccount.addOverdraft(1000)
        checkingAccount.withdraw(1200)

        const result = checkingAccount.getStatement(date1, date2)

        expect(result).toBe(`date || credit || debit || balance || overdraft\n${date} ||  || 1200.00 || -200.00 || 1000.00\n${date} || 1000.00 ||  || 1000.00 || 1000.00\n`)
    })

    it('should not be possible to deposit more than 20000 in a year on a savings account', () => {
        savingsAccount.deposite(20000)

        expect(() => savingsAccount.deposite(1000)).toThrow('maximum deposit limit of 20000 per year reached')
    })

    it('should be possible to get a pdf of the statement', () => {
        let date = new Date()
        date = date.toLocaleDateString()

        checkingAccount.deposite(1000)
        checkingAccount.addOverdraft(1000)
        checkingAccount.withdraw(1200)

        const result = checkingAccount.getPDF()

        expect(result).toEqual(`date || credit || debit || balance || overdraft\n${date} ||  || 1200.00 || -200.00 || 1000.00\n${date} || 1000.00 ||  || 1000.00 || 1000.00\n`)
    })

    it('should add interest every month', () => {
        investmentAccount.deposite(1000)
        expect(investmentAccount.payInterest()).toEqual(currency(1061.21))
    })
})