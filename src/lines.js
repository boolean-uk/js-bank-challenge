class Lines {
    constructor(transactions) {
        this.transactions = transactions;
    }

    linesToPrint() {
        let statementLinesToPrint = [];

        this.transactions.forEach((object) => {
            let date = object.date;
            let balance = object.balance.toFixed(2);
            let debitAmount = ``;
            let creditAmount = ``;

            object.type === "debit" ?
                (debitAmount = object.amount.toFixed(2)) :
                (creditAmount = object.amount.toFixed(2));

            const columnCharLength = 4;

            while (debitAmount.length < columnCharLength) {
                debitAmount = ` ` + debitAmount;
            }

            while (creditAmount.length < columnCharLength) {
                creditAmount = ` ` + creditAmount;
            }

            const rowInReceipt = `||   ${date}  ||  ${creditAmount}    ||  ${debitAmount}  ||  ${balance}    ||`;
            statementLinesToPrint.push(rowInReceipt);
        });

        statementLinesToPrint.reverse();
        return statementLinesToPrint;
    }
}

module.exports = Lines;