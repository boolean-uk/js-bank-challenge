import { Client } from "../src/client"
import { Bank } from "../src/bank"
import { Account } from "../src/account"
import { SavingAccount } from "../src/savingaccount"

describe("Saving tests ", () => {

    let registerClient: Client
    let newClient: Client
    let bank: Bank
    let savingAccount: SavingAccount

    beforeEach(() => { 
        registerClient = new Client("John", "Smith", "01-10-1998")
        newClient = new Client("Chris", "Test", "01-12-1990")
        bank = new Bank()
        savingAccount = new SavingAccount()
    })

    it("should not allowed for overdarft", () => {
        let bankState = 1000
        let amount = 1500
        savingAccount.deposit(bankState)
        expect(savingAccount.withdraw(amount)).toBe('Overdraft is disabled in saving account')
    })

})