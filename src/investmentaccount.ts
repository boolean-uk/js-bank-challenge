import { Account } from "./account";
import { PersonalAccount } from "./personalaccunt";

export class InvestmentAccount extends Account implements PersonalAccount{
    accountType(): string {
        return "Invetment Account"
    }

    withdraw(amount: number, date : string = this.now): string{
        let tmp = []
        if(amount > 0){
            if(amount <= this.countBalanceTotal()){
                if(!this.debit[date]){
                    tmp.push(amount)
                    this.debit[date] = tmp
                } else {
                    this.debit[date].push(amount)
                }
                return "Money withdrew"
            }
            else return "Overdraft is disabled in investment account"
        } else return "No money to withdraw from deposit"
    }
    
}