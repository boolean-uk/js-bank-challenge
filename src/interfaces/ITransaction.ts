import { TransactionType } from "../enumerations/TransactionType";

export interface ITransaction {
  getDate(): Date;
  getAmount(): number;
  getType(): TransactionType;
}
