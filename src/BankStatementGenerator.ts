import {Transaction} from "./Transaction";
export class BankStatementGenerator {

    generateBankStatement(transactions: Transaction[], startingBalance: number): string {
        const result: string[] = []
        let balance: number = startingBalance
        result.push("date       ||  credit   ||   debit   || balance\n");

        transactions.forEach((transaction: Transaction) => {
            balance += transaction.type === 'deposit' ? transaction.amount : -transaction.amount
            if(transactions.includes(transaction)) {
                result.push(transaction.getTransactionDate().padEnd(11) + "||")

                if (transaction.type === 'deposit') {
                    result.push(" " + String(transaction.amount.toFixed(2)).padEnd(10))
                    result.push("||" + " ".repeat(11))
                } else {
                    result.push(" ".repeat(11) + "||")
                    result.push(" " + String(transaction.amount.toFixed(2)).padEnd(10))
                }
                result.push("|| " + String(balance.toFixed(2)))
                result.push("\n")
            }
        })

        return result.join("")
    }
}