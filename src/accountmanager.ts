import { Account, CheckingAccount, InvestmentAccount, SavingAccount, Transaction } from "./account";

export class AccountManager{
    
   
  
  
   
    
    constructor(){

    }


    createSavingAccount(accountNumber : string) : SavingAccount {
        let savingAccount : SavingAccount = new SavingAccount(accountNumber);
        return savingAccount;
    }

    createInvestmentAccount(accountNumber: string): InvestmentAccount {
        let investmentAccount : InvestmentAccount = new InvestmentAccount(accountNumber);
        return investmentAccount;
    }

    createCheckingAccount(accountNumber: string): CheckingAccount {
        let checkingAccount : CheckingAccount = new CheckingAccount(accountNumber);
        return checkingAccount;
    }
   
    addDeposit(account: Account, deposit: number) {
        if(deposit > 0){

            if(this.isNotSavingAccount(account,deposit) !== true){
                account.addTransaction(new Transaction(deposit, account.getBalance()+ deposit, new Date()));
            }
        }else console.log("You can not deposit amount of money below zero!")

    }

    addDepositWithDate(account: Account, deposit: number, date:Date) {
        if(deposit > 0){

            if(this.isNotSavingAccount(account,deposit) !== true){
                account.addTransaction(new Transaction(deposit, account.getBalance()+ deposit,date));
            }
        }else console.log("You can not deposit amount of money below zero!")

    }

    withdraw(account: Account, withdraw: number) {
        if(withdraw >  0){
            
            if(withdraw <= account.getBalance() || (withdraw <= (account.getBalance() +500) &&  account.getIsOverdraftPossible()  === true)){
            withdraw = withdraw*(-1);
            account.addTransaction(new Transaction(withdraw, account.getBalance()+ withdraw,new Date()));
            }else console.log("You do not have that amount of money! or Wrong type of account");
        }else console.log("You can not withdraw amount of money below zero!");
    }

    withdrawWithDate(account: Account, withdraw: number, date:Date) {
        if(withdraw >  0){
            
            if(withdraw <= account.getBalance() || (withdraw <= (account.getBalance() +500) &&  account.getIsOverdraftPossible()  === true)){
            withdraw = withdraw*(-1);
            account.addTransaction(new Transaction(withdraw, (account.getBalance()+ withdraw), date));
            }else console.log("You do not have that amount of money! or Wrong type of account");
        }else console.log("You can not withdraw amount of money below zero!");
    }

    isNotSavingAccount(account : Account,deposit : number) : boolean{
       return ( account.getAccountType() === "saving" && (account.getBalance() + deposit) >= 20000) ;
    }


    getBankStatement(account : Account) : string {
        const transactions =  account.getTransactions();
        let statement : string = "date     || credit  || debit  || balance\n";


          
        for( let index  in transactions){
            

            statement += transactions[index].getDate().getFullYear()+"/"+transactions[index].getDate().getMonth()+"/"+ transactions[index].getDate().getDay()+
            " || " +   transactions[index].getCredit()   + 
            " || " +  transactions[index].getDebit()  + 
            " || " +  transactions[index].getCurrentBalance() + "\n"  }

        return statement;
    }

    accumulate (investmentAccount : InvestmentAccount){
        investmentAccount.accumulate();
    }


    findTransactionsBetweenDates(account : Account, startDate: Date, endDate: Date): Transaction[]{
        let transactions : Transaction[] = account.getTransactions();
        let filteredTransactions : Transaction[] =[];

        for (const transaction of transactions) {
            if (transaction.getDate() >= startDate && transaction.getDate() <= endDate) {
                filteredTransactions.push(transaction);
            }
        }
        return filteredTransactions;
    }

    getBankStatementforDates(account : Account, startDate: Date, endDate: Date) : string {
        const transactions = this.findTransactionsBetweenDates(account,startDate,endDate);
        let statement : string = "date     || credit  || debit  || balance\n";


          
        for( let index  in transactions){
            

            statement += transactions[index].getDate().getFullYear()+"/"+transactions[index].getDate().getMonth()+"/"+ transactions[index].getDate().getDay()+
            " || " +   transactions[index].getCredit()   + 
            " || " +  transactions[index].getDebit()  + 
            " || " +  transactions[index].getCurrentBalance() + "\n"  }

        return statement;
    }



    

}