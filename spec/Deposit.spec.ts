import { Deposit } from "../src/Deposit"

describe("Deposit tests", () => {
    let deposit: Deposit

    beforeEach(() => {
      deposit = new Deposit(10000)  
    })

    it("should create a deposit", () => {
        expect(deposit.amountOfMoney).toEqual(10000)
    })

})