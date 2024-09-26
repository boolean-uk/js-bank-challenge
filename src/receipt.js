const Lines = require("./lines.js");

class Receipt {
    constructor(transactions) {
        this.transactions = transactions;
    }
    print() {
        let heading = `||     date       ||  credit  || debit  || balance  ||`;

        let lines = new Lines(this.transactions);
        lines = lines.linesToPrint();
        lines.unshift(heading);

        lines = lines.join("\n");
        return lines;
    }
}

module.exports = Receipt;