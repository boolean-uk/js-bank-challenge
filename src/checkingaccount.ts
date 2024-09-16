import { Account } from "./account";
import { PersonalAccount } from "./personalaccunt";

export class CheckingAccount extends Account implements PersonalAccount{
    
    accountType(): string {
        return "Checking Account"
    }

}