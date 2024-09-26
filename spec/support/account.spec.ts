import "jasmine";
import Account from "../../src/account"
describe("account", () => {
    let account: Account

    beforeEach(() => {
        account = new Account()
    })

    it("should deposit money", () => {
        let result: boolean = account.deposit(420, new Date())

        expect(result).toBe(true);
    });

    it("should not deposit incorrect amount of money", () => {
        let result: boolean = account.deposit(-420, new Date())

        expect(result).toBe(false);
    });

    it("should withdraw money", () => {
        account.deposit(1000, new Date())
        let result: boolean = account.withdraw(100, new Date())

        expect(result).toBe(true);
    });


    it("should not withdraw money when there is not enough money on the account", () => {
        account.deposit(100, new Date())
        let result: boolean = account.withdraw(1000, new Date())

        expect(result).toBe(false);
    });

    it("should print bank statement", () => {
        account.deposit(400, new Date("2023-7-25"))
        account.withdraw(300, new Date("2023-7-25"))

        const expectedResult: string[] = []
        let actualResult: string = account.printStatement()

        expectedResult.push("date       || credit  || debit  || balance\n");
        expectedResult.push("7/25/2023  || 400     ||        || 400\n");
        expectedResult.push("7/25/2023  ||         || 300    || 100\n");

        expect(actualResult).toBe(expectedResult.join(""));
    });

    it("should allow overdraft", () => {
        account.setOverdraft(500)
        let result = account.withdraw(500 , new Date())
        
        expect(result).toBe(true);
    });

    it("should not allow overdraft", () => {
        account.setOverdraft(0)
        let result = account.withdraw(500 , new Date())

        expect(result).toBe(false);
    });

    it("should print statement between two dates", () => {
        account.deposit(1000, new Date("2023-7-13"))
        account.deposit(2000, new Date("2023-7-25"))

        let actualResult: string = account.printStatementByDate(new Date("2023-7-22"), new Date("2023-7-25"))

        const expectedResult: string[] = []
        expectedResult.push("date       || credit  || debit  || balance\n");
        expectedResult.push("7/25/2023  || 2000    ||        || 2000\n");

        expect(actualResult).toBe(expectedResult.join(""));
    });
});