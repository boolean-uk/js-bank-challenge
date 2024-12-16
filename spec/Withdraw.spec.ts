import { Withdraw } from "../src/Withdraw"

describe("Withdraw tests", () => {
    let withdraw: Withdraw

    beforeEach(() => {
      withdraw = new Withdraw(10000)  
    })

    it("should create a withdraw", () => {
        expect(withdraw.amountOfMoney).toEqual(10000)
    })

})