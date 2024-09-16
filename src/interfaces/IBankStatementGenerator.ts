import { ITransaction } from "./ITransaction";

export interface IBankStatementGenerator {
  generateBankStatement(transactions: ITransaction[]): string;
  generateBankStatementBetweenTwoDates(
    transactions: ITransaction[],
    earlierDate: Date,
    laterDate: Date
  ): string;
}
