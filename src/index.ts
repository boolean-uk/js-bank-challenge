import { Account } from "./Account"

let account = new Account("1234")
account.deposit(10000)
account.deposit(3000)
account.withdraw(4500)

let accountBalance = account.calculateBalance()
let bankStatement = account.generateBankStatements(new Date('2023-07-25'), new Date('2023-07-26'))

let bankStatementNone = account.generateBankStatements(new Date('2023-07-20'), new Date('2023-07-21'))
