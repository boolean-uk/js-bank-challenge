| Class   | Field                                      | Method                                        | Condition                                                | Output                |
|---------|--------------------------------------------|-----------------------------------------------|----------------------------------------------------------|-----------------------|
| Account | ArrayList<Transaction> transactionHistory; | void depositMoney(double amountDeposited)     | if the amount of money in the account >= 0               | true                  |
|         | String accountOwner                        |                                               | if the amount of money in the account < 0                | false                 |
|         |                                            | boolean withdrawMoney(double amountWithdrawn) | if the amount of money in the account >= amountWithdrawn | true                  |
|         |                                            |                                               | if the amount of money in the account < amountWithdrawn  | false                 |
|         |                                            |                                               |                                                          |                       |
|         |                                            | double calculateBalance()                     | always                                                   | double accountBalance |



| Class       | Field                     | Method | Condition | Output |
|-------------|---------------------------|--------|-----------|--------|
| Transaction | LocalDate transactionDate |        |           |        |
|             | int amount                |        |           |        |
|             | String type               |        |           |        |



| Class                  | Field | Method                         | Condition | Output               |
|------------------------|-------|--------------------------------|-----------|----------------------|
| BankStatementGenerator |       | String generateBankStatement() | always    | String bankStatement |
|                        |       |                                |           |                      |
|                        |       |                                |           |                      |
