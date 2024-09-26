class Statement {
    constructor(listOfTransactions) {
        this.statementHeader = 'date       || credit  || debit  || balance\n'
        this.listOfTransactions = listOfTransactions
    }

    printStatement() {
        let statement = this.statementHeader
        this.listOfTransactions.map(t => statement += `${t.date} || ${t.credit} || ${t.debit} || ${t.newBalance}\n`)
        return statement
    }
}

module.exports = Statement