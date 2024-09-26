export class Account_Transaction{
    date : Date;
    transactionType : string;
    amount : number;

    constructor(date : Date, transactionType : string, amount : number){
        this.date = date;
        this.transactionType = transactionType;
        this.amount = amount;
    }
}