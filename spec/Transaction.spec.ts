import { TransactionType } from "../src/enumerations/TransactionType";
import { Transaction } from "../src/implementations/Trasaction";

describe("Transaction", () => {
  it("should create a Transaction object", () => {
    const date = new Date();
    const amount = 100;
    const type = TransactionType.Deposit;
    const transaction = new Transaction(date, amount, type);

    expect(transaction.getDate()).toBe(date);
    expect(transaction.getAmount()).toBe(amount);
    expect(transaction.getType()).toBe(type);
  });
});
