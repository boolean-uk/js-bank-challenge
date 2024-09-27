import { NormalAccount } from "./NormalAccount";
import { Transaction } from "./Transaction";

export class SavingsAccount extends NormalAccount {
  deposityearlimit: number;
  constructor() {
    super();
    this.debit = 0;
    this.deposityearlimit = 20000;
  }
  override deposit(amount: number): string {
    if (amount > 0 && this.deposityearlimit > amount) {
      this.balance += amount;
      this.deposityearlimit -= amount;
      let transaction = new Transaction(amount, true, this.balance);
      this.transactions.push(transaction);
      return "Transaction has been done properly";
    }
    return "Transaction has been declined!\n Wrong data provided or year limit exceeded!";
  }
}
