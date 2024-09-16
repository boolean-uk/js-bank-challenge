import { TransactionType } from "../enumerations/TransactionType";
import { IBankStatementGenerator } from "../interfaces/IBankStatementGenerator";
import { ITransaction } from "../interfaces/ITransaction";

declare global {
  interface String {
    formatted(...args: any[]): string;
  }
}

String.prototype.formatted = function (...args: any[]): string {
  return this.replace(
    /{(\d+)(,?)(-)?(\d+)?}/g,
    (match, index, comma, leftAlign, width) => {
      const argIndex = parseInt(index, 10);
      let argValue =
        args[argIndex] !== undefined ? args[argIndex].toString() : "";
      const argWidth = width ? parseInt(width, 10) : 0;

      if (argWidth > argValue.length) {
        const padChar = comma === "," ? " " : " ";
        if (leftAlign === "-") {
          argValue = argValue.padEnd(argWidth, padChar);
        } else {
          argValue = argValue.padStart(argWidth, padChar);
        }
      }

      return argValue;
    }
  );
};

export class BankStatementGenerator implements IBankStatementGenerator {
  public generateBankStatement(transactions: ITransaction[]): string {
    const bankStatementBuilder: string[] = [];

    const format = this.getLineFormat(transactions);

    this.generateInitialLine(bankStatementBuilder, format);
    this.generateTransactionLines(bankStatementBuilder, transactions, format);

    return bankStatementBuilder.join("\n");
  }

  private getLineFormat(transactions: ITransaction[]): string {
    const dateAlign = this.getDateAlign(transactions);
    const creditAlign = this.getCreditAlign(transactions);
    const debitAlign = this.getDebitAlign(transactions);
    const balanceAlign = this.getBalanceAlign(transactions);

    return `{0,-${dateAlign}} || {1,-${creditAlign}} || {2,-${debitAlign}} || {3,-${balanceAlign}}`;
  }

  private generateInitialLine(
    bankStatementBuilder: string[],
    lineFormat: string
  ): void {
    bankStatementBuilder.push(
      lineFormat.formatted("date", "credit", "debit", "balance")
    );
  }

  private generateTransactionLines(
    bankStatementBuilder: string[],
    transactions: ITransaction[],
    lineFormat: string
  ): void {
    const transactionLines = this.getTransactionLines(transactions, lineFormat);
    transactionLines.reverse();

    for (const transactionLine of transactionLines) {
      bankStatementBuilder.push(transactionLine);
    }
  }

  private getTransactionLines(
    transactions: ITransaction[],
    lineFormat: string
  ): string[] {
    const transactionsLines: string[] = [];
    let balance = 0;

    for (const transaction of transactions) {
      balance +=
        transaction.getType() === TransactionType.Deposit
          ? transaction.getAmount()
          : -transaction.getAmount();

      transactionsLines.push(
        this.getTransactionLine(transaction, lineFormat, balance)
      );
    }

    return transactionsLines;
  }

  private getTransactionLine(
    transaction: ITransaction,
    lineFormat: string,
    balance: number
  ): string {
    return lineFormat.formatted(
      this.getFormattedTransactionDate(transaction),
      this.getFormattedTransactionCredit(transaction),
      this.getFormattedTransactionDebit(transaction),
      this.getFormattedBalance(balance)
    );
  }

  private getDateAlign(transactions: ITransaction[]): number {
    const longestDateLength = transactions
      .map((t) => this.getFormattedTransactionDate(t).length)
      .reduce((max, len) => Math.max(max, len), 0);

    return Math.max("date".length, longestDateLength);
  }

  private getCreditAlign(transactions: ITransaction[]): number {
    const longestCreditLength = transactions
      .map((t) => this.getFormattedTransactionCredit(t).length)
      .reduce((max, len) => Math.max(max, len), 0);

    return Math.max("credit".length, longestCreditLength);
  }

  private getDebitAlign(transactions: ITransaction[]): number {
    const longestDebitLength = transactions
      .map((t) => this.getFormattedTransactionDebit(t).length)
      .reduce((max, len) => Math.max(max, len), 0);

    return Math.max("debit".length, longestDebitLength);
  }

  private getBalanceAlign(transactions: ITransaction[]): number {
    let longestBalanceLength = 0;
    let balance = 0;

    for (const transaction of transactions) {
      balance +=
        transaction.getType() === TransactionType.Deposit
          ? transaction.getAmount()
          : -transaction.getAmount();

      longestBalanceLength = Math.max(
        longestBalanceLength,
        this.getFormattedBalance(balance).length
      );
    }

    return Math.max("balance".length, longestBalanceLength);
  }

  private getFormattedTransactionDate(transaction: ITransaction): string {
    const format = "dd/MM/yyyy";
    return transaction.getDate().toISOString().slice(0, 10).replace(/-/g, "/");
  }

  private getFormattedTransactionCredit(transaction: ITransaction): string {
    return transaction.getType() === TransactionType.Deposit
      ? (transaction.getAmount() / 100).toFixed(2)
      : "";
  }

  private getFormattedTransactionDebit(transaction: ITransaction): string {
    return transaction.getType() === TransactionType.Deposit
      ? ""
      : (transaction.getAmount() / 100).toFixed(2);
  }

  private getFormattedBalance(balance: number): string {
    return (balance / 100).toFixed(2);
  }

  public generateBankStatementBetweenTwoDates(
    transactions: ITransaction[],
    earlierDate: Date,
    laterDate: Date
  ): string {
    if (earlierDate > laterDate) {
      return "";
    }

    const bankStatementBuilder: string[] = [];

    const format = this.getLineFormat(transactions);

    this.generateInitialLine(bankStatementBuilder, format);
    this.generateTransactionLinesBetweenDates(
      bankStatementBuilder,
      transactions,
      format,
      earlierDate,
      laterDate
    );

    return bankStatementBuilder.join("\n");
  }

  private generateTransactionLinesBetweenDates(
    bankStatementBuilder: string[],
    transactions: ITransaction[],
    lineFormat: string,
    earlierDate: Date,
    laterDate: Date
  ): void {
    const transactionLines = this.getTransactionLinesBetweenDates(
      transactions,
      lineFormat,
      earlierDate,
      laterDate
    );
    transactionLines.reverse();

    for (const transactionLine of transactionLines) {
      bankStatementBuilder.push(transactionLine);
    }
  }

  private getTransactionLinesBetweenDates(
    transactions: ITransaction[],
    lineFormat: string,
    earlierDate: Date,
    laterDate: Date
  ): string[] {
    const transactionsLines: string[] = [];
    let balance = 0;

    for (const transaction of transactions) {
      balance +=
        transaction.getType() === TransactionType.Deposit
          ? transaction.getAmount()
          : -transaction.getAmount();

      if (this.transactionIsBetweenDates(transaction, earlierDate, laterDate)) {
        transactionsLines.push(
          this.getTransactionLine(transaction, lineFormat, balance)
        );
      }
    }

    return transactionsLines;
  }

  private transactionIsBetweenDates(
    transaction: ITransaction,
    earlierDate: Date,
    laterDate: Date
  ): boolean {
    return (
      transaction.getDate() >= earlierDate && transaction.getDate() <= laterDate
    );
  }
}
