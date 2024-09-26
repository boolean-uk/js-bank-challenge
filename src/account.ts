import Transaction from "./transaction"

class Account {
    public overdraft: number = 0
    private transactions: Transaction[] = []

    public deposit(amount: number, date: Date): boolean {
        if(amount <= 0) return false
        this.transactions.push({ amount: amount, date: date })
        return true
    }

    public withdraw(amount: number, date: Date): boolean {
        if(amount <= 0 || this.getBalance() + this.overdraft < amount) 
        return false
        this.transactions.push({ amount: -amount, date: date })
        return true
    }

    private getBalance(): number {
        let balance = 0
        this.transactions.forEach((transaction: Transaction) => {
            balance += transaction.amount
        })
        return balance 
    }

    private getStatement(transactions: Transaction[]): string {
        let currentBalance = 0
        const stringStatement: string[] = []
        stringStatement.push("date       || credit  || debit  || balance\n");

        transactions.forEach((transaction: Transaction) => {
            currentBalance += transaction.amount
            if(transactions.includes(transaction)) {
                stringStatement.push(transaction.date.toLocaleDateString().padEnd(11) + "||")
                //Debit
                if (transaction.amount < 0) {
                    stringStatement.push(" ".repeat(9) + "||")
                    stringStatement.push(" " + String(Math.abs(transaction.amount)).padEnd(7))    
                } 
                //Credit
                else {
                    stringStatement.push(" " + String(transaction.amount).padEnd(8))
                    stringStatement.push("||" + " ".repeat(8))                 
                }
                stringStatement.push("|| " + String(currentBalance) +"\n")
            }
        })
        return stringStatement.join("")
    }

    public printStatementByDate(date1: Date, date2: Date): string {
        const olderDate = date1 < date2 ? date1 : date2
        const newerDate = date1 < date2 ? date2 : date1

        const transactionsByDate: Transaction[] = []
        this.transactions.forEach((transaction: Transaction) => {
            if(transaction.date >= olderDate && transaction.date <= newerDate)
                transactionsByDate.push(transaction)
        })

        return this.getStatement(transactionsByDate)
    }

    public printStatement(){
        return this.getStatement(this.transactions)
    }

    public setOverdraft(amount: number) {
        if (amount <= 500 ){
            this.overdraft = amount
        }
    }
}

    
export default Account

