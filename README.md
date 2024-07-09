# Banking System

This challenge asks you to put into practice everything you've learned about object oriented programming. Use the concepts we've covered to help organise your code, keep things modular and easy to change.

### Core Requirements

- Deposits and withdrawals
- Account statement (date, credit or debit amount, balance) printing
- You must create at least one test for every function you create

### Acceptance criteria

**Given** a client makes a deposit of 1000 on 10-01-2012  
**And** a deposit of 2000 on 13-01-2012  
**And** a withdrawal of 500 on 14-01-2012  
**When** she prints her bank statement  
**Then** she would see:

```
date       || credit  || debit  || balance
14/01/2012 ||         || 500.00 || 2500.00
13/01/2012 || 2000.00 ||        || 3000.00
10/01/2012 || 1000.00 ||        || 1000.00
```

### Special Considerations

Banks usually do not store a "balance" for every single user in their system, an account balance is usually calculated in real time using every transaction that has happened in the account.

Transaction amounts are never stored as floats, they are not precise enough to accurately reflect monetary values when performing math on many transactions. Take some time to consider other potential options.

The statement print-out above should be considered a type of user interface, albeit a very simplistic one. Your system should probably output JSON so that various types of user interfaces can consume the data and present it in the appropriate way.

#### Extensions

- Ability to generate ordered bank statements between 2 dates
- Reject withdrawals if the withdraw amount exceeds the available funds. Available funds must always be calculated based on a complete transaction history, not a variable or property that gets updated
- Allow adding an overdraft to the account
- Different account types (Savings, Investment, Checking). Savings & Investment accounts can't have overdrafts, checking accounts can. Investment accounts accumulate 2% interest every month - this interest is paid directly into the investment account as a credit.
- Deposit limits of 20,000 per year on Savings accounts
- Generate PDFs of bank statements
- A front-end online banking app
