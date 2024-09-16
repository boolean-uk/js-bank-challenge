# Domain model for Bank Challenge

```ts
enum TransactionType {}

interface ITransaction {
    getDate(): Date
    getAmount(): number
    getType(): TransactionType
}

class Transaction implements ITransaction {
    private date: Date
    private amount: number
    private type: TransactionTyp

    public getDate(): Date {}
    public getAmount(): number {}
    public getType(): TransactionType {}
}

interface IBankAccount {
    deposit(amount: number): boolean
    withdraw(amount: number): boolean
    getTransactions(): ITransaction[]
}

abstract class AbstractBankAccount implements IBankAccount {
    private transactions: ITransaction[]

    public deposit(amount: number, date: Date): boolean {}
    public withdraw(amount: number, date: Date): boolean {}
    public getTransactions(): ITransaction[] {}
    private calculateCurrentBallance(): number {}
}

class SavingsBankAccount extends AbstractBankAccount {
    private depositLimitPerYear: number

    public override deposit(amount: number, date: Date): boolean {}
}

class InvestmentBankAccount extends AbstractBankAccount {
    public accumulateInterest(interestRate: number, date: Date): boolean {}
}

class CheckingBankAccount extends AbstractBankAccount {
    private overdraftLimit: number

    public override withdraw(amount: number, date: Date): boolean {}
}

interface IBankStatementGenerator {
    public generateBankStatement(transactions: ITransaction[]): string
    public generateBankStatementBetweenTwoDates(transactions: ITransaction[], earlierDate: Date, laterDate: Date): string
}

class BankStatementGenerator implements IBankStatementGenerator {
    public generateBankStatement(transactions: ITransaction[]): string {}
    public generateBankStatementBetweenTwoDates(transactions: ITransaction[], earlierDate: Date, laterDate: Date): string {}
}
```
