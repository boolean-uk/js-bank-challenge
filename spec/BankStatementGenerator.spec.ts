import { TransactionType } from "../src/enumerations/TransactionType";
import { BankStatementGenerator } from "../src/implementations/BankStatementGenerator";
import { Transaction } from "../src/implementations/Trasaction";
import { ITransaction } from "../src/interfaces/ITransaction";

describe("BankStatementGenerator", () => {
  let bankStatementGenerator: BankStatementGenerator;

  beforeEach(() => {
    bankStatementGenerator = new BankStatementGenerator();
  });

  it("should generate a bank statement with header only when there are no transactions", () => {
    const transactions: ITransaction[] = [];
    const expectedStatement = "date || credit || debit || balance";

    const result = bankStatementGenerator.generateBankStatement(transactions);

    expect(result).toBe(expectedStatement);
  });

  it("should generate a bank statement with correct format and transactions", () => {
    const transactions = [
      new Transaction(new Date("2023-07-20"), 5000, TransactionType.Deposit),
      new Transaction(new Date("2023-07-25"), 1000, TransactionType.Withdraw),
      new Transaction(new Date("2023-07-30"), 2000, TransactionType.Deposit),
      new Transaction(new Date("2023-08-01"), 1500, TransactionType.Withdraw),
    ];

    const expectedStatement =
      "date       || credit || debit || balance\n" +
      "2023/08/01 ||        || 15.00 || 45.00  \n" +
      "2023/07/30 || 20.00  ||       || 60.00  \n" +
      "2023/07/25 ||        || 10.00 || 40.00  \n" +
      "2023/07/20 || 50.00  ||       || 50.00  ";

    const result = bankStatementGenerator.generateBankStatement(transactions);

    expect(result).toBe(expectedStatement);
  });

  it("should generate a bank statement between two dates", () => {
    const transactions = [
      new Transaction(new Date("2023-07-20"), 5000, TransactionType.Deposit),
      new Transaction(new Date("2023-07-25"), 1000, TransactionType.Withdraw),
      new Transaction(new Date("2023-07-30"), 2000, TransactionType.Deposit),
      new Transaction(new Date("2023-08-01"), 1500, TransactionType.Withdraw),
    ];

    const earlierDate = new Date("2023-07-25");
    const laterDate = new Date("2023-07-30");

    const expectedStatement =
      "date       || credit || debit || balance\n" +
      "2023/07/30 || 20.00  ||       || 60.00  \n" +
      "2023/07/25 ||        || 10.00 || 40.00  ";

    const result = bankStatementGenerator.generateBankStatementBetweenTwoDates(
      transactions,
      earlierDate,
      laterDate
    );

    expect(result).toBe(expectedStatement);
  });

  it("should return an empty string when generating a bank statement between invalid dates", () => {
    const transactions = [
      new Transaction(new Date("2023-07-20"), 5000, TransactionType.Deposit),
      new Transaction(new Date("2023-07-25"), 1000, TransactionType.Withdraw),
      new Transaction(new Date("2023-07-30"), 2000, TransactionType.Deposit),
      new Transaction(new Date("2023-08-01"), 1500, TransactionType.Withdraw),
    ];

    const earlierDate = new Date("2023-08-01");
    const laterDate = new Date("2023-07-30");

    const result = bankStatementGenerator.generateBankStatementBetweenTwoDates(
      transactions,
      earlierDate,
      laterDate
    );

    expect(result).toBe("");
  });
});
