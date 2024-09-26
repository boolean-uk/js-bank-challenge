import Transaction from "./transaction";
import transaction from "./transaction";

class BankAccount {
    private transactions: Transaction[] = []
    private overDraft: number = 0

    public deposit(amount: number, date: Date): boolean {
        if(amount <= 0) return false

        this.transactions.push({ amount: amount, date: date })
        return true
    }

    private calculateBalance(): number {
        let balance: number = 0
        this.transactions.forEach((transaction: Transaction) => {
            balance += transaction.amount
        })

        return balance
    }

    public allowOverDraft() {
        this.overDraft = 500
    }

    public withdraw(amount: number, date: Date): boolean {
        if(amount <= 0) return false

        if(this.calculateBalance() + this.overDraft < amount) return false

        this.transactions.push({ amount: -amount, date: date })
        return true
    }

    public returnAccountHistory(transactions: Transaction[]): string {
        const result: string[] = []
        let balance: number = 0
        result.push("date       || credit  || debit  || balance\n");

        this.transactions.forEach((transaction: Transaction) => {
            balance += transaction.amount
            if(transactions.includes(transaction)) {
                result.push(transaction.date.toLocaleDateString().padEnd(11) + "||")

                if (transaction.amount > 0) {
                    result.push(" " + String(transaction.amount).padEnd(8))
                    result.push("||" + " ".repeat(8))
                } else {
                    result.push(" ".repeat(9) + "||")
                    result.push(" " + String(transaction.amount).padEnd(7))
                }
                result.push("|| " + String(balance))
                result.push("\n")
            }
        })

        return result.join("")
    }

    public showAccountHistory(): string {
        return this.returnAccountHistory(this.transactions)
    }

    public showAccountHistoryBetweenTwoDates(date1: Date, date2: Date): string {
        if(date1 > date2) return "Wrong dates"
        const transactionBetweenTwoDates: Transaction[] = []

        this.transactions.forEach((transaction: Transaction) => {
            if(transaction.date > date1 && transaction.date < date2)
                transactionBetweenTwoDates.push(transaction)
        })

        return this.returnAccountHistory(transactionBetweenTwoDates)
    }
}

export default BankAccount