import { Checking_account } from "../checking_account"

describe("checking account tests", () => {
    let checking_account: Checking_account

    beforeEach(() => { 
        checking_account = new Checking_account()
    })

    it("should isOverdraftAvailable be true", () => {
        checking_account.getOverdraftAvailable();

        expect(checking_account.isOverdraftAvailable).toBe(true);
    })

    it("should allow overdraft, balance after transaction is higher than max overdraft", () => {
        checking_account.getOverdraftAvailable();
        checking_account.getFunds(100);

        expect(checking_account.getBalance()).toBe(-100);
    })

    it("should allow overdraft, balance after transaction is equal max overdraft", () => {
        checking_account.getOverdraftAvailable();
        checking_account.getFunds(500);

        expect(checking_account.getBalance()).toBe(-500);
    })

    it("should not allow overdraft, balance after transaction would be higher than max overdraft", () => {
        checking_account.getOverdraftAvailable();
        expect(() => checking_account.getFunds(600)).toThrowError("Your max overdraft is - " + checking_account.maxOverdraft);
    })

    it("should not allow overdraft, isOverdraft not available", () => {
        expect(() => checking_account.getFunds(100)).toThrowError("Balance after transaction would be negative, ask for overdraft");
    })



})