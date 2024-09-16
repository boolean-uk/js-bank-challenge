## Requirements

You should be able to interact with your code via a JavaScript REPL - Node REPL or browser console (You don't need to implement a command line interface that takes input from STDIN.)
Deposits, withdrawal.
Account statement (date, credit or debit amount, balance) printing.
Data can be kept in memory (it doesn't need to be stored to a database or anything).

### Acceptance criteria

Given a client makes a deposit of 1000 on 10-01-2012
And a deposit of 2000 on 13-01-2012
And a withdrawal of 500 on 14-01-2012
When she prints her bank statement
Then she would see:

```
date || credit || debit || balance
14/01/2012 || || 500.00 || 2500.00
13/01/2012 || 2000.00 || || 3000.00
10/01/2012 || 1000.00 || || 1000.00
```

## Noun & Verb

### Noun

date, credit or debit amount, balance

### Verb

deposit, withdrawal, print

## Domain Model (no table)

**CLASS**
BankAccount

**PROPERTIES (constructor)**

- balance: @Number
- transactions: Array[Transaction]

**METHODS (function - inputs, error conditions and return values)**

- deposit(amount: integer, date: string)
  returns a message "you have deposited $$$"
  update Array[Transaction] by pushing the obj to it
  if amount is invalid (<= 0 or not a number) throw new Error('Amount not valid') // return "Amount not valid"
  if date date is invalid, throws new Error('Date not valid')
  if action is "deposit", add the debit to balance
  if action is "withdrawal", subtract the credit from balance

  - withdrawal(amount: integer, date: string)
    subtract the credit from balance
    returns a message "you have withdrawed $$$"
    update Array[Transaction] by pushing the obj to it
    if amount is invalid (<= 0 or not a number) throw new Error('Amount not valid') // return "Amount not valid"
    if date is invalid, throws new Error('Date not valid')

  - deposit(amount: integer, date: string)
    add the debit to balance
    returns a message "you have deposited $$$"
    update Array[Transaction] by pushing the obj to it
    if amount is invalid (<= 0 or not a number) throw new Error('Amount not valid') // return "Amount not valid"
    if date date is invalid, throws new Error('Date not valid')

**CLASS**
Account

**PROPERTIES (constructor)**

no property

**METHODS (function - inputs, error conditions and return values)**

- print()
  returns Array(Strings) one string for each line in the statement

## Domain Model

| Class   | Properties                         | Methods                  | Outputs                           | Memos                                       |
| ------- | ---------------------------------- | ------------------------ | --------------------------------- | ------------------------------------------- |
| Bank    | balance @Number                    |                          |                                   |                                             |
|         | transactions @Array [@transaction] |                          |                                   |                                             |
|         |                                    | deposit(amount, date)    | none                              | balance += amount                           |
|         |                                    | withdrawal(amount, date) | none                              | balance -= amount                           |
|         |                                    |                          |                                   |                                             |
| Account |                                    | print()                  | transactions @Array[@transaction] | loop through and print out the transactions |

#### MEMO

- properties: things that go into the constructor (add the data type as well)
- date is oldest to newest
