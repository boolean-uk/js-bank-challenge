import { Client } from "../src/client"
import { Bank } from "../src/bank"
import { PersonalAccount } from "../src/personalaccunt"
import { SavingAccount } from "../src/savingaccount"

describe("Bank tests ", () => {

    let registerClient: Client
    let newClient: Client
    let bank: Bank
    let personalaccount: SavingAccount

    beforeEach(() => { 
        registerClient = new Client("John", "Smith", "01-10-1998")
        newClient = new Client("Chris", "Test", "01-12-1990")
        bank = new Bank()
        personalaccount = new SavingAccount()
    })

    it("should return true for registered client", () => {
        expect(bank.ifClientRegistered(registerClient.id)).toBeTruthy
    })

    it("should return false for new client", () => {
        expect(bank.ifClientRegistered(newClient.id)).toBeFalsy
    })

    it("should return client by id", () => {
        expect(bank.getClientByID(registerClient.id)).toEqual(registerClient)
    })

    it("should return undefined for not register client", () => {
        expect(bank.getClientByID(newClient.id)).toEqual(undefined)
    })

    it("should register new client", () => {
        let name = "Chris";
        let lastName = "Test";
        let birthDate = "01-12-1990";
        bank.register(name, lastName, birthDate)

        expect(bank.listClientsOfBank.length).toEqual(4)
        expect(bank.getClientByID(newClient.id)?.fullName).toEqual(name + " " + lastName)
    })

    
    it("should create an account for register client", () =>{
        let list = []
        list.push(personalaccount.accountType())
        expect(bank.createAccount(personalaccount, registerClient.id)).toBe('Saving Account created for John Smith')
        expect(bank.getAccountList(registerClient.id)).toEqual(list)
    })

    it("should stop from creating an account for new client", () =>{
        expect(bank.createAccount(personalaccount, newClient.id)).toBe('To create account You need to register')
    })

})