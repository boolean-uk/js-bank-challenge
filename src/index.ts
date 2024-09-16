import { BankStatementGenerator } from "./implementations/BankStatementGenerator";
import { CheckingBankAccount } from "./implementations/CheckingBankAccount";

const overdraftLimit = 500;
const account = new CheckingBankAccount(overdraftLimit);
console.log("Created new checking bank account!\n");

account.deposit(1000, new Date("2023-01-01"));
console.log("Deposit: 10.00 on 2023-01-01");

account.withdraw(500, new Date("2023-01-07"));
console.log("Withdraw: 5.00 on 2023-01-07");

account.deposit(4200, new Date("2023-01-22"));
console.log("Deposit: 42.00 on 2023-01-22\n");

const bankStatementGenerator = new BankStatementGenerator();
console.log(
  bankStatementGenerator.generateBankStatement(account.getTransactions())
);
