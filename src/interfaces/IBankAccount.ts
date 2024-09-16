import { ITransaction } from "./ITransaction";

export interface IBankAccount {
  deposit(amount: number, date: Date): boolean;
  withdraw(amount: number, date: Date): boolean;
  getTransactions(): ITransaction[];
}
