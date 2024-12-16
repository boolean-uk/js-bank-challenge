export class Account {
    

    private accountNumber : string;
    private isOverdraftPossible: boolean = false;
    private transactions: Array<Transaction> = []
    private accountType : string  = "not specified"; 
    constructor(accountnumber:string){
        this.accountNumber = accountnumber;
    }


    setIsOverdraftPossible(isOverdraftPossible : boolean){
        this.isOverdraftPossible = isOverdraftPossible;
    }

    getAccountNumber() : string{
        return this.accountNumber;
    }

    getBalance() : number{
        let balance : number = 0;
        for( let index  in this.transactions){
            balance += this.transactions[index].getAmountOfMoney();
        }

        return balance;
    }

    addTransaction(deposit: Transaction) {
        this.transactions.push(deposit);
    }

    getTransactions() : Array<Transaction> {
        return this.transactions;
    }

    getIsOverdraftPossible() :boolean {
        return this.isOverdraftPossible;
    }

    
    getAccountType(): string {
        return this.accountType;
     }

    setAccountType(accountType : string){
        this.accountType = accountType;
    }

}



export class SavingAccount extends Account{
    
    
    

    constructor(accountnumber:string){
        super(accountnumber);
        this.setIsOverdraftPossible(false);
        this.setAccountType("saving");
    }


}


export class InvestmentAccount extends Account{
    
    

    constructor(accountnumber:string){
        super(accountnumber);
        this.setIsOverdraftPossible(false);
        this.setAccountType("investment");
    }



    accumulate(){
        let accumulated : number = this.getBalance() * 0.02;
        let newBalance : number = this.getBalance() + accumulated;
        this.addTransaction(new Transaction(accumulated,newBalance, new Date()));
    }
}
export class CheckingAccount extends Account{
    
    
  

    constructor(accountnumber:string){
        super(accountnumber);
        this.setIsOverdraftPossible(true);
        this.setAccountType("checking");
    }


  
}

export class Transaction{
    private date : Date;
    private credit : number =0;
    private debit : number = 0;
    private currentBalance : number ;



    constructor(amuountMoney : number, currentBalance : number, date: Date){
            this.date = date;
            this.currentBalance = currentBalance;
            if(amuountMoney > 0){
               this.credit = amuountMoney;
               this.debit =0;
            }else if(amuountMoney < 0){
                this.debit = amuountMoney;
                this.credit = 0
            }
    }



    getAmountOfMoney() : number {
        return this.credit + this.debit;
    }

    getDate() : Date{
        return this.date;
    }

    getDebit() : number{
        return this.debit;
    }
    getCredit() : number{
        return this.credit;
    }
    getCurrentBalance() : number {
        return this.currentBalance;
    }   

    setDate(date : Date){
        this.date = date;
    }


}