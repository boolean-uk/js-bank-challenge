import {BankAccount} from "./BankAccount"

export class CheckingAccount implements BankAccount {
    getBalance(): number {
        return 0
    }
    withdraw(): boolean {
        return false
    }
    deposit(): void {

    }
    getOverdraft(): boolean {
        return false
    }
    generateStatement(): void {
        
    }
}