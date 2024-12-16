import { CheckingAccount, InvestmentAccount, SavingAccount } from "./account";
import { AccountManager } from "./accountmanager";


let savingAccount : SavingAccount;
let investmentAccount : InvestmentAccount;
let checkingAccount : CheckingAccount;
let accountManager : AccountManager = new AccountManager();


savingAccount = accountManager.createSavingAccount("12345");
investmentAccount = accountManager.createInvestmentAccount("1234");
checkingAccount = accountManager.createCheckingAccount("321");

accountManager.addDepositWithDate(checkingAccount,1000, new Date(2012,1,10));
accountManager.addDepositWithDate(checkingAccount,2000, new Date(2012,1,13));
accountManager.withdrawWithDate(checkingAccount,500,new Date(2012,1,14));
console.log(accountManager.getBankStatement(checkingAccount));
console.log("---------------------------------------------------------------");
accountManager.addDeposit(savingAccount,200000);
console.log(accountManager.getBankStatement(savingAccount));
accountManager.withdraw(checkingAccount,50000);


accountManager.addDepositWithDate(investmentAccount,1000, new Date(2012,1,10));
accountManager.addDepositWithDate(investmentAccount,2000, new Date(2012,1,13));
accountManager.addDepositWithDate(investmentAccount,1000, new Date(2012,1,10));
accountManager.addDepositWithDate(investmentAccount,2000, new Date(2012,1,13));
accountManager.addDepositWithDate(investmentAccount,1000, new Date(2012,1,10));
accountManager.addDepositWithDate(investmentAccount,2000, new Date(2012,1,13));
accountManager.addDepositWithDate(investmentAccount,1000, new Date(2012,1,10));
accountManager.addDepositWithDate(investmentAccount,2000, new Date(2012,1,13));

console.log(accountManager.getBankStatementforDates(investmentAccount,new Date(2012,1,10),new Date(2012,1,10)));