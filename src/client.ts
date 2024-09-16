import { Account } from "./account"

export class Client{

    private idNumber: number
    // private accounts: Account[] = []

    constructor(private name: string, private lastName: string, private birthDate: string){
        this.name = name
        this.lastName = lastName
        this.birthDate = birthDate

        this.idNumber = new Date(birthDate).valueOf()
    }

    get id(): number {
        return this.idNumber
    }

    get fullName(): string {
        return this.name + " " + this.lastName
    }

    // get accountList(): Account[] {
    //     return this.accounts
    // }
}