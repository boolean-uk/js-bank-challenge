import { Account } from "./account";
import { Account_Transaction } from "./accountTransaction";

export class Checking_account extends Account{
    isOverdraftAvailable : boolean;
    maxOverdraft : number;

    constructor(){
        super();
        this.isOverdraftAvailable = false;
        this.maxOverdraft = 500;
    }

    getOverdraftAvailable(){
        return this.isOverdraftAvailable = !this.isOverdraftAvailable;
    }

    getFunds(fundsToGet : number){
        let fundsAfterTransaction = this.getBalance() - fundsToGet

        if(this.isOverdraftAvailable && fundsAfterTransaction < (-1 * this.maxOverdraft))
            throw new Error("Your max overdraft is - " + this.maxOverdraft);

        if(!this.isOverdraftAvailable && fundsAfterTransaction < 0)
            throw new Error("Balance after transaction would be negative, ask for overdraft");

        this.accountTransactionList.push(new Account_Transaction(new Date(), "debit", fundsToGet));
    }
}