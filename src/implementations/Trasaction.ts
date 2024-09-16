import { ITransaction } from "../interfaces/ITransaction";
import { TransactionType } from "../enumerations/TransactionType";

export class Transaction implements ITransaction {
  constructor(
    private date: Date,
    private amount: number,
    private type: TransactionType
  ) {}

  public getDate(): Date {
    return this.date;
  }

  public getAmount(): number {
    return this.amount;
  }

  public getType(): TransactionType {
    return this.type;
  }
}
