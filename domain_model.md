PROPERTIES:

-Array of transactions [transactions]
-Account balance - number

-Transaction is an Objects {
    -amount - number
    -date - string -- in my example i will hard code date
    -balance - number -- this is the balance after the current transaction
    -type - string -- debit or credit.
}


CLASS - Bank

METHODS:

deposit(amount, date)
    -update account balance
    -passes parameters to Class Transaction - where transaction is created
    -add transaction to the transactions array
    -throw ERROR if - the amount entered is not valid (below zero), not a number.

withdraw(amount, date)
    -update account balance
    -passes parameters to Class Transaction - where transaction is created
    -add transaction to the transactions array
    -throw ERROR if - the amount entered is not valid, not a number, or the balance goes below a limit


CLASS - Statement 

METHODS:

statement()
    -return all transactions in order of the dates they were created
    -stating the date, amount, type, balance after transaction


CLASS - StatementLines

METHODS: 

createLines()
    -takes the array of transactions
    -creates the statement lines
    -returns the statement lines


CLASS - Transaction

PROPERTIES: date, amount, type, balance

METHODS:

createTransaction() 
    -creates transaction
    -returns new transaction
