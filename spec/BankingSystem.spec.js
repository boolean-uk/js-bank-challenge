/* eslint-disable no-undef */
import BankingSystem from '../src/BankingSystem.js'

describe('Banking System', () => {
    let client

    beforeEach(() => {
        client = new BankingSystem()
    })

    it('should make a deposit', () => {
        let expected = `date            || `
        expected += `credit          || `
        expected += `debit           || `
        expected += `balance        \n`
        expected += `Fri Jun 14 2024 || `
        expected += `50.00           || `
        expected += `                || `
        expected += `50.00          \n`
        client.deposit('2024-6-14', 50)
        expect(client.printBankStatement()).toEqual(expected)
    })

    it('should make a withdraw', () => {
        let expected = `date            || `
        expected += `credit          || `
        expected += `debit           || `
        expected += `balance        \n`
        expected += `Fri Jun 14 2024 || `
        expected += `50.00           || `
        expected += `                || `
        expected += `50.00          \n`
        expected += `Sat Jun 15 2024 || `
        expected += `                || `
        expected += `25.00           || `
        expected += `25.00          \n`
        client.deposit('2024-6-14', 50)
        client.withdraw('2024-6-15', 25)
        expect(client.printBankStatement()).toEqual(expected)
    })

    it('should print bank statement', () => {
        let expected = `date            || `
        expected += `credit          || `
        expected += `debit           || `
        expected += `balance        \n`
        expected += `Fri Jun 14 2024 || `
        expected += `50.00           || `
        expected += `                || `
        expected += `50.00          \n`
        expected += `Sat Jun 15 2024 || `
        expected += `                || `
        expected += `25.00           || `
        expected += `25.00          \n`
        expected += `Sun Jun 16 2024 || `
        expected += `100.00          || `
        expected += `                || `
        expected += `125.00         \n`
        client.deposit('2024-6-14', 50)
        client.withdraw('2024-6-15', 25)
        client.deposit('2024-6-16', 100)
        expect(client.printBankStatement()).toEqual(expected)
    })

    it('should print bank statement between dates', () => {
        let expected = `date            || `
        expected += `credit          || `
        expected += `debit           || `
        expected += `balance        \n`
        expected += `Fri Jun 14 2024 || `
        expected += `50.00           || `
        expected += `                || `
        expected += `50.00          \n`
        expected += `Wed Jun 26 2024 || `
        expected += `50.00           || `
        expected += `                || `
        expected += `100.00         \n`
        expected += `Mon Jul 15 2024 || `
        expected += `                || `
        expected += `25.00           || `
        expected += `75.00          \n`
        client.deposit('2024-6-14', 50)
        client.deposit('2024-6-26', 50)
        client.withdraw('2024-7-15', 25)
        client.deposit('2024-8-16', 50)
        expect(client.printBankStatementBetweenDates('2024-6-14', '2024-7-15')).toEqual(expected)
        console.log(`\n${expected}`)
    })
})
