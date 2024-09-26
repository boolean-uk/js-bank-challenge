class TransactionDate {
    createDate() {
        let date = new Date();

        const month = date.toLocaleString("en-gb", { month: "2-digit" });
        const day = date.toLocaleString("en-gb", { day: "2-digit" });
        const year = date.getFullYear();

        return `${day}/${month}/${year}`;
    }
}

module.exports = TransactionDate;