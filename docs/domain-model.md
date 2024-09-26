-=+=-

Bank Challenge
--------------

-=+=-

Classes, Constructors, and Methods
----------------------------------

| class bankAccount |
|-------------------|
| constructors      |
| -> this.account = [] |
| -> this.balance = 0 |
|---------------------------|
| methods           |
| -> createAccount(name) |
| -> checkBalance() |
| -> depositFunds(#, date) |
| -> withdrawFunds(#, date) |
| -> print()        |
|---------------------------|

- createAccount(name) -> creates an object w/ the passed name and empty array to hold the tx objects;
- checkBalance() -> tracks the overall balance of the account;
- depositFunds(#, date) -> credit the account w/ the amount referenced;
- withdrawFunds(#, date) -> debit the account w/ the amount referenced;
- print() -> returns a list of tx, including date, amount, type, and balance after the tx.

-=+=-

| class printer |
|---------------|
| methods       |
| -> printStatement() |
|---------------------|

- printStatement() -> uses the print method from bankAccount to provide information to return.

-=+=-

| class customer |
|----------------|
| methods        |
| -> createNewAccount() |
| -> getBalance() |
| -> makeDeposit() |
| -> makeWithdrawal() |
| -> getStatement() |
|-----------------------|

- createNewAccount() -> uses the bankAccount createAccount method;
- getBalance() -> uses the bankAccount checkBalance method;
- makeDeposit() -> uses the bankAccount depositFunds method;
- makeWithdrawal() -> uses the bankAccount withdrawFunds method;
- getStatement() -> uses the bankAccount print method and the printer class to create a bank statement.

-=+=-