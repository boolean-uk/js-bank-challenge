import { AccountManager } from "../src/accountmanager";


describe("Account Manager tests", () => {
    let accountManager: AccountManager; 

    beforeEach(() => { // Before each "it" test, start with a new Accounnt Manager instance
        accountManager = new AccountManager();
    })
    
    it("Should create a new saving account", () => {
     

        //when
        let savingAccount =  accountManager.createSavingAccount("1234");
        //then
        expect(savingAccount.getAccountType()).toEqual('saving');
        expect(savingAccount.getAccountNumber()).toEqual('1234');
    })

    it("Should create a new Investment account", () => {
     

        //when
        let savingAccount =  accountManager.createInvestmentAccount("1234");
        //then
        expect(savingAccount.getAccountType()).toEqual('investment');
        expect(savingAccount.getAccountNumber()).toEqual('1234');
    })

    it("Should create a new Checking account", () => {
     

        //when
        let checkingAccount =  accountManager.createCheckingAccount("1234");
        //then
        expect(checkingAccount.getAccountType()).toEqual('checking');
        expect(checkingAccount.getAccountNumber()).toEqual('1234');
    })

    it("Should return blanace of the account", () =>{
        //given
        let checkingAccount =  accountManager.createCheckingAccount("1234");
        let deposit: number = 5000;

        //when
        accountManager.addDeposit(checkingAccount, deposit);
        accountManager.addDeposit(checkingAccount, deposit);
        accountManager.addDeposit(checkingAccount, deposit);
        accountManager.addDeposit(checkingAccount, deposit);
        accountManager.addDeposit(checkingAccount, deposit);
        accountManager.addDeposit(checkingAccount, deposit);

        //then
        expect(checkingAccount.getBalance()).toEqual(30000);
    })

    it("Should add deposit to account", () =>{
        //given
        let checkingAccount =  accountManager.createCheckingAccount("1234");
        let deposit: number = 5000;
        //when
        accountManager.addDeposit(checkingAccount, deposit);
        accountManager.addDeposit(checkingAccount, 10000);

        //then
        expect(checkingAccount.getBalance()).toEqual(15000);
    })

    
    it("Should withdraw amount of money from the account", () =>{
        //given
        let checkingAccount =  accountManager.createCheckingAccount("1234");
        let deposit: number = 5000;
        accountManager.addDeposit(checkingAccount, deposit);
        accountManager.addDeposit(checkingAccount, 10000);
        //when
        accountManager.withdraw(checkingAccount, 8000)

        //then
        expect(checkingAccount.getBalance()).toEqual(7000);
    })

    it("Should return bank statement", () =>{
        //given
        let checkingAccount =  accountManager.createCheckingAccount("1234");
        let deposit: number = 5000;
        accountManager.addDeposit(checkingAccount, deposit);
        accountManager.addDeposit(checkingAccount, 10000);
        accountManager.withdraw(checkingAccount, 8000)
        accountManager.withdraw(checkingAccount, 3000)

        let statement : string = accountManager.getBankStatement(checkingAccount);
        let shouldEqual : string = "date     || credit  || debit  || balance\n2023/6/2 || 5000 || 0 || 5000\n2023/6/2 || 10000 || 0 || 15000\n2023/6/2 || 0 || -8000 || 7000\n2023/6/2 || 0 || -3000 || 4000\n"
        console.log("Should return bank statement: \n"+statement);
        expect(statement).toEqual(shouldEqual); 
    })

    it("should allow to overdraw the account max 500  for Checking account", () =>{
        //given
        let checkingAccount =  accountManager.createCheckingAccount("1234");
        let deposit: number = 5000;
        accountManager.addDeposit(checkingAccount, deposit);
    
        //when
        accountManager.withdraw(checkingAccount, 5500)

        //then
        expect(checkingAccount.getBalance()).toEqual(-500);
    })


    
    it("should not allow to overdraw the account for Checking account", () =>{
        //given
        let checkingAccount =  accountManager.createCheckingAccount("1234");
        let deposit: number = 5000;
        accountManager.addDeposit(checkingAccount, deposit);
    
        //when
        accountManager.withdraw(checkingAccount, 5600)

        //then
        expect(checkingAccount.getBalance()).toEqual(5000);
    })

    it("should not allow to overdraw the account for Saving account", () =>{
        //given
        let savingAccount =  accountManager.createSavingAccount("1234");
        let deposit: number = 5000;
        accountManager.addDeposit(savingAccount, deposit);
    
        //when
        accountManager.withdraw(savingAccount, 5600)

        //then
        expect(savingAccount.getBalance()).toEqual(5000);
    })

    it("should not allow to overdraw the account for Investment account", () =>{
        //given
        let investmentAccount =  accountManager.createInvestmentAccount("1234");
        let deposit: number = 5000;
        accountManager.addDeposit(investmentAccount, deposit);
    
        //when
        accountManager.withdraw(investmentAccount, 5600)

        //then
        expect(investmentAccount.getBalance()).toEqual(5000);
    })

    it("Should accumulate 2% interest  for saving account", () =>{
        //given
        let investmentAccount =  accountManager.createInvestmentAccount("1234");
        let deposit: number = 5000;
        accountManager.addDeposit(investmentAccount, deposit);
    
        //when
        accountManager.accumulate(investmentAccount);

        //then
        expect(investmentAccount.getBalance()).toEqual(5100);
    })


    it("Should find transactions between two dates ", () =>{
        //given
        let investmentAccount =  accountManager.createInvestmentAccount("1234");
        let deposit: number = 5000;
        accountManager.addDepositWithDate(investmentAccount, deposit, new Date(2021,2,3));
        accountManager.addDepositWithDate(investmentAccount, deposit, new Date(2021,2,3));
        accountManager.addDepositWithDate(investmentAccount, deposit, new Date(2021,2,3));
        accountManager.addDepositWithDate(investmentAccount, deposit, new Date(2021,2,3));
        accountManager.addDepositWithDate(investmentAccount, deposit, new Date(2021,2,3));
        accountManager.addDepositWithDate(investmentAccount, deposit, new Date(2021,2,10));
        
        let statement : string = accountManager.getBankStatementforDates(investmentAccount,new Date(2021,1,2),new Date(2021,2,9));
        let statementShouldLook : string = "date     || credit  || debit  || balance\n2021/2/3 || 5000 || 0 || 5000\n2021/2/3 || 5000 || 0 || 10000\n2021/2/3 || 5000 || 0 || 15000\n2021/2/3 || 5000 || 0 || 20000\n2021/2/3 || 5000 || 0 || 25000\n";
        
        expect(statement).toEqual(statementShouldLook);
    })

    
    it("Should not allow to deposit more money on saving account ", () =>{
        //given
        let savingAccount =  accountManager.createSavingAccount("1234");
        let deposit: number = 5000;
        accountManager.addDeposit(savingAccount, deposit);
        //then
        accountManager.addDeposit(savingAccount, 15001);
        //then
        expect(savingAccount.getBalance()).toEqual(5000);
    })






})

    

  