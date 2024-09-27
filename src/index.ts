import { NormalAccount } from "./NormalAccount";
import { Transaction } from "./Transaction";
import { SavingsAccount } from "./SavingsAccount";
import { InvestmentAccount } from "./InvestmentAccount";


    var yesterdaydate = new Date();
    var tomorrowdate = new Date();
    yesterdaydate.setDate(yesterdaydate.getDate() - 1);
    tomorrowdate.setDate(tomorrowdate.getDate() + 1);
    const currentDate = new Date();
    const oneYearFromNow = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth() - 1,
        currentDate.getDate()
    );
let normalAccount= new NormalAccount()
    console.log(normalAccount.deposit(100))
    console.log(normalAccount.deposit(200))
    console.log(normalAccount.withdraw(400))
    console.log("Account debit = " + normalAccount.debit)
    console.log(normalAccount.createStatement(yesterdaydate,tomorrowdate))
 let savingsAccount = new SavingsAccount()
    console.log("Saving account debit = " + savingsAccount.debit)
    console.log(savingsAccount.deposit(100))
    console.log(savingsAccount.withdraw(200))
    console.log(savingsAccount.deposit(300))
    console.log(savingsAccount.createStatement(yesterdaydate,tomorrowdate))
let investmentAccount = new InvestmentAccount()
    console.log(investmentAccount.deposit(100))
    investmentAccount.interestStartDate=oneYearFromNow
    console.log("account balance + interest = " + investmentAccount.getBalanceWithInterest())
    console.log(investmentAccount.withdraw(100))
    
