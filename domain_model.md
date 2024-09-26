Requirements

- Deposits, withdrawal
- Account statement (date, credit or debit amount, balance)

PROPERTIES

- amount: integer
- date: Date js object (new Date)
- type: 'deposit' OR 'withdrawal'

class Account

- transactionList: Array[Transaction]
- balance: Integer

METHODS (function - inputs, error conditions and return values)

- credit(amount: integer, date: string) returns updated Array[Transaction]
  if amount is invalid (<= 0 or not a number) throw new Error('Amount not valid') // return "Amount not valid"
  if date date is invalid, throws new Error('Date not valid')
- debit(amount: integer, date: string) returns updated Array[Transaction]
  if amount or date invalid, throws new Error(...)
  if amount > current balance then throw Error()
- printStatement() -> Array(Strings) one string for each line in the statement
  make sure transactions sorted from oldest at the bottom of the statement

- class TransactionDate

- returns a formatted date

- METHOD(function - returns new date)

- class Lines

- returns an array of lines to be printed

- class Receipt

- returns a string receipt
