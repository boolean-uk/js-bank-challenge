import { Client } from "../src/client"
import { Bank } from "../src/bank"
import { Account } from "../src/account"
import { PersonalAccount } from "../src/personalaccunt"

describe("Account tests ", () => {

    let registerClient: Client
    let newClient: Client
    let bank: Bank
    let account: Account
    let personalaccunt: PersonalAccount

    beforeEach(() => { 
        registerClient = new Client("John", "Smith", "01-10-1998")
        newClient = new Client("Chris", "Test", "01-12-1990")
        bank = new Bank()
        account = new Account()
    })

    //DEPOSIT
    it("should add transaction to credit object", () => {
        let amount = 2000
        let d = new Date('06-07-2023')
        let date = account.formatDate(d)

        expect(account.deposit(amount, date)).toEqual("Money added to deposit")
        expect(Object.keys(account.getCreditList).length).toEqual(1)
    })

    it("should add transaction to credit object with today's date", () => {
        let amount = 2000

        expect(account.deposit(amount)).toEqual("Money added to deposit")
        expect(Object.keys(account.getCreditList).length).toEqual(1)
    })

    it("should add 3 transactions to credit object", () => {
        let amount1 = 2000
        let amount2 = 1000
        let amount3 = 500
        let d = new Date('06-07-2023')
        let date = account.formatDate(d)
        let listOfAmounts = [amount1, amount2, amount3]

        expect(account.deposit(amount1, date)).toEqual("Money added to deposit")
        expect(account.deposit(amount2, date)).toEqual("Money added to deposit")
        expect(account.deposit(amount3, date)).toEqual("Money added to deposit")
        expect(Object.keys(account.getCreditList).length).toEqual(1)
        expect(account.getCreditList[date]).toEqual(listOfAmounts)
    })

    it("should not add any transactions to credit object", () => {
        let amount = -2000

        expect(account.deposit(amount)).toEqual("No money to add to deposit")
    })

    //WITHDRAW
    it("should add transaction to debit object", () => {
        account.deposit(4000)
        let amount = 2000
        let d = new Date('06-07-2023')
        let date = account.formatDate(d)

        expect(account.withdraw(amount, date)).toEqual("Money withdrew")
        expect(Object.keys(account.getDebitList).length).toEqual(1)
    })

    it("should add transaction to debit object with today's date", () => {
        account.deposit(4000)
        let amount = 2000

        expect(account.withdraw(amount)).toEqual("Money withdrew")
        expect(Object.keys(account.getDebitList).length).toEqual(1)
    })

    it("should add 3 transactions to debit object", () => {
        account.deposit(4000)
        let amount1 = 2000
        let amount2 = 1000
        let amount3 = 500
        let d = new Date('06-07-2023')
        let date = account.formatDate(d)
        let listOfAmounts = [amount1, amount2, amount3]

        expect(account.withdraw(amount1, date)).toEqual("Money withdrew")
        expect(account.withdraw(amount2, date)).toEqual("Money withdrew")
        expect(account.withdraw(amount3, date)).toEqual("Money withdrew")
        expect(Object.keys(account.getDebitList).length).toEqual(1)
        expect(account.getDebitList[date]).toEqual(listOfAmounts)
    })

    it("should not add any transactions to debit object", () => {
        let amount = 0

        expect(account.withdraw(amount)).toEqual("No money to withdraw from deposit")
    })

    //BALANCE
    it("should count balanace of account based on transactions example 1", () => {
        let amountToDeposit = 1000;
        let amountToWithdraw = 700;
        let date1 = new Date("01/12/2020")
        let date2 = new Date("02/12/2020")
        account.deposit(amountToDeposit, account.formatDate(date1));
        account.withdraw(amountToWithdraw, account.formatDate(date2));

        expect(account.countBalanceTotal()).toEqual(300);
    
    })

    it("should count balanace of account based on transactions example 2", () => {
        let amountToDeposit1 = 1000;
        let amountToDeposit2 = 1500;
        let amountToWithdraw = 700;
        let date1 = new Date("01/12/2020")
        let date2 = new Date("02/12/2020")
        let date3 = new Date("03/12/2020")
        account.deposit(amountToDeposit1, account.formatDate(date1)); //1000
        account.deposit(amountToDeposit1, account.formatDate(date1)); //2000
        account.withdraw(amountToWithdraw, account.formatDate(date2)); //1300
        account.deposit(amountToDeposit2, account.formatDate(date3)); //2800

        expect(account.countBalanceTotal()).toEqual(2800);
    
    })

    it("should give a following statement example 1", () => {
        let amountToDeposit = 1000;
        let amountToWithdraw = 700;
        let date1 = new Date("01-12-2020")
        let date2 = new Date("02-12-2020")
        // console.log(account.formatDate(date1))
        account.deposit(amountToDeposit, account.formatDate(date1));
        account.withdraw(amountToWithdraw, account.formatDate(date2));
    
        let balance = account.countBalanceTotal()
        let st = []
        let tmpCreditList = structuredClone(account.getCreditList)
        let tmpDebitList = structuredClone(account.getDebitList)
        st.push("date      || ")
        st.push("credit  || ")
        st.push("debit  || ")
        st.push("balance \n")
    
        let allDates = []
        allDates.push(Object.keys(tmpCreditList))
        allDates.push(Object.keys(tmpDebitList))
        allDates.reverse()
    
        for (let d = 0; d < allDates.length; d++) {
            let date = allDates[d][0]
            let previousValue = balance
            st.push(date)
            st.push(" || ")
            if (Object.keys(tmpCreditList).includes(date)) {
                for (let d = 0; d < tmpCreditList[date].length; d++) {
                    st.push(tmpCreditList[date][d] + "    ||        || ")
                    balance -= tmpCreditList[date][d]
                }
                delete tmpCreditList.date
            }
            if(Object.keys(tmpDebitList).includes(date)) { 
                for (let d = 0; d < tmpDebitList[date].length; d++) {
                        st.push("        || ")
                        st.push(tmpDebitList[date][d] + "    || ")
                        balance += tmpDebitList[date][d]
                }
                delete tmpDebitList.date
            }
            st.push(previousValue + "\n")
        }
        
        expect(account.generateStatement()).toBe(st.join(""))
    })

    it("should give a following statement example 2", () => {
        let amountToDeposit1 = 1000;
        let amountToDeposit2 = 2000;
        let amountToWithdraw = 500;
        let date1 = new Date("01-10-2012")
        account.deposit(amountToDeposit1, account.formatDate(date1));
        let date2 = new Date("01-13-2012")
        account.deposit(amountToDeposit2, account.formatDate(date2));
        let date3 = new Date("01-14-2012")
        account.withdraw(amountToWithdraw, account.formatDate(date3))
    
        let balance = account.countBalanceTotal()
        let st = []
        let tmpCreditList = structuredClone(account.getCreditList)
        let tmpDebitList = structuredClone(account.getDebitList)
        st.push("date      || ")
        st.push("credit  || ")
        st.push("debit  || ")
        st.push("balance \n")
    
        let allDates = []
        allDates.push(Object.keys(tmpCreditList))
        allDates.push(Object.keys(tmpDebitList))
        allDates =  allDates.reduce((acc, curr) => acc.concat(curr), [])
        allDates.reverse()
    
        for (let d = 0; d < allDates.length; d++) {
            let date = allDates[d]
            let previousValue = balance
            st.push(date)
            st.push(" || ")
            if (Object.keys(tmpCreditList).includes(date)) {
                for (let d = 0; d < tmpCreditList[date].length; d++) {
                    st.push(tmpCreditList[date][d] + "    ||        || ")
                    balance -= tmpCreditList[date][d]
                }
                delete tmpCreditList.date
            }
            if(Object.keys(tmpDebitList).includes(date)) { 
                for (let d = 0; d < tmpDebitList[date].length; d++) {
                        st.push("        || ")
                        st.push(tmpDebitList[date][d] + "    || ")
                        balance += tmpDebitList[date][d]
                }
                delete tmpDebitList.date
            }
            st.push(previousValue + "\n")
        }
        
        expect(account.generateStatement()).toBe(st.join(""))
    })

    //EXTENSIONS
    it("should disable withdraw if the amount exceeds the available funds", () =>{
        let bankState = 2000
        let amount = 50000
        account.deposit(bankState)
        expect(account.withdraw(amount)).toBe('Amount you want to withdraw exceeds the available funds')
    })

    it("should allow withdraw if the overdraw is 500", () =>{
        let bankState = 1000
        let amount = 1500
        account.deposit(bankState)
        expect(account.withdraw(amount)).toBe('Money withdrew')
    })
})