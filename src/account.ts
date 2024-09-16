export class Account{
    
    protected credit: { [key: string]: number[] } = {};
    protected debit: { [key: string]: number[] } = {};
    todaysDate = new Date()
    now = this.formatDate(this.todaysDate)

    constructor(){
        this.credit = {}
        this.debit = {}
    }

    get getCreditList() {
        return this.credit
    }

    get getDebitList() {
        return this.debit
    }

    formatDate(newDate: Date){
        return newDate.getDate() + '-' + (newDate.getMonth()+1) + '-'
        + newDate.getFullYear()
    }

    deposit(amount: number, date : string = this.now): string{
        let tmp = []
        if(amount > 0){
            if(!this.credit[date]){
                tmp.push(amount)
                this.credit[date] = tmp
            } else {
                this.credit[date].push(amount)
            }
            return "Money added to deposit"
        } else return "No money to add to deposit"
    }

    withdraw(amount: number, date : string = this.now): string{
        let tmp = []
        if(amount > 0){
            if(this.countBalanceTotal() + 500 - amount >= 0){
                if(!this.debit[date]){
                    tmp.push(amount)
                    this.debit[date] = tmp
                } else {
                    this.debit[date].push(amount)
                }
                return "Money withdrew"
            }
            else return "Amount you want to withdraw exceeds the available funds"
        } else return "No money to withdraw from deposit"
    }

    countBalanceTotal(): number{
        let balance = 0
        let arrCredit = Object.values(this.credit)
        let arrDebit = Object.values(this.debit)
        for (let i = 0; i < arrCredit.length; i++){
            for (let c = 0; c < arrCredit[i].length; c++) {
                balance += arrCredit[i][c];
            }
        }

        for (let i = 0; i < arrDebit.length; i++){
            for (let c = 0; c < arrDebit[i].length; c++) {
                balance -= arrDebit[i][c];
            }
        }

        return balance;
    }

    countBalanceTotalInYear(year: number) {
        let balance = 0;
        const arrCredit = Object.values(this.credit);
        const arrDebit = Object.values(this.debit);
    
        const creditForYear = arrCredit.map((transactions) =>
            transactions.filter((transactionDate) => new Date(transactionDate).getFullYear() === year)
        );
    
        const debitForYear = arrDebit.map((transactions) =>
            transactions.filter((transactionDate) => new Date(transactionDate).getFullYear() === year)
        );
    
        for (const transactions of creditForYear) {
            for (const amount of transactions) {
                balance += amount;
            }
        }
    
        for (const transactions of debitForYear) {
            for (const amount of transactions) {
                balance -= amount;
            }
        }
    
        return balance;
    }

    generateStatement(){
        let balance = this.countBalanceTotal()
        let st = []
        let tmpCreditList = structuredClone(this.credit)
        console.log(tmpCreditList)
        let tmpDebitList = structuredClone(this.debit)
        console.log(tmpDebitList)
        st.push("date      || ")
        st.push("credit  || ")
        st.push("debit  || ")
        st.push("balance \n")
    
        let allDates = []
        allDates.push(Object.keys(tmpCreditList))
        allDates.push(Object.keys(tmpDebitList))
        allDates = allDates.reduce((acc, curr) => acc.concat(curr), [])
        allDates.reverse()
    
        for (let d = 0; d < allDates.length; d++) {
            let date = allDates[d]
            let previousValue = balance
            st.push(date)
            st.push(" || ")
            if (Object.keys(tmpCreditList).includes(date)) {
                for (let d = 0; d < tmpCreditList[date].length; d++) {
                    st.push(tmpCreditList[date][d] + "    ||        || ")
                    balance -= tmpCreditList[date][d]
                }
                delete tmpCreditList.date
            }
            else if(Object.keys(tmpDebitList).includes(date)) { 
                for (let d = 0; d < tmpDebitList[date].length; d++) {
                        st.push("        || ")
                        st.push(tmpDebitList[date][d] + "    || ")
                        balance += tmpDebitList[date][d]
                }
                delete tmpDebitList.date
            }
            st.push(previousValue + "\n")
        }
        console.log(st.join(""))
        return st.join("")
    }
}