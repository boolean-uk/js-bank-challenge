import { Account } from "./account";
import { CheckingAccount } from "./checkingaccount";
import { Client } from "./client";
import { InvestmentAccount } from "./investmentaccount";
import { PersonalAccount } from "./personalaccunt";
import { SavingAccount } from "./savingaccount";

export class Bank{
    private clientsOfBank: Client[] = [new Client("John", "Smith", "01-10-1998"), 
                                        new Client("Beata", "Johanson", "18-09-2000"), 
                                        new Client("Fredy", "Mercury", "23-12-1968")]
    
    private clientsAccount: { [key: number]: SavingAccount[]|InvestmentAccount[]|CheckingAccount[] } = {}

    constructor(){
    }

    get listClientsOfBank(): Client[] {
        return this.clientsOfBank
    }

    register(name: string, lastName: string, birthDate: string){
        this.clientsOfBank.push(new Client(name, lastName, birthDate))
    }

    ifClientRegistered(newId: number){
        for(let i=0; i < this.clientsOfBank.length ; i++){
            if (this.clientsOfBank[i].id === newId) return true
        }
        return false
    }

    getClientByID(newId: number){
        for(let i=0; i < this.clientsOfBank.length ; i++){
            if (this.clientsOfBank[i].id === newId) return this.clientsOfBank[i]
        }
        return undefined
    }

    getAccountList(newId: number){
        if(this.ifClientRegistered(newId)){
            let accountName: string[] = []
            if(this.clientsAccount[newId]){
                for (let i = 0; i < this.clientsAccount[newId].length; i++) {
                    let type = this.clientsAccount[newId][i].accountType()
                    accountName.push(type)
                }
                return accountName
            }
        }
    }

    getAccountByName(newId: number, type: string){
        if(this.ifClientRegistered(newId)){
            if(this.clientsAccount[newId]){
                for (let i = 0; i < this.clientsAccount[newId].length; i++) {
                    if(type === this.clientsAccount[newId][i].accountType() ) return this.clientsAccount[newId][i]
                }
            }
        }
    }

    accountsListById(newId: number){
        if(this.ifClientRegistered(newId)){
            return this.clientsAccount[newId]
        }
    }

    createAccount(account: SavingAccount|CheckingAccount|InvestmentAccount, id: number) {
        if(this.ifClientRegistered(id)){
            let type = account.accountType()
            let tmp = []
            if(!this.clientsAccount[id]){
                tmp.push(account)
                this.clientsAccount[id] = tmp
            } else {
                this.clientsAccount[id].push(account)
            }
            return type + ' created for ' + this.getClientByID(id)?.fullName
        } else return 'To create account You need to register'
    }
}