const Transactions = require("../src/Transactions.js");

/*
- Creates a Transaction class with list of transactions and balance (default to 0). - DONE
- Can create a new transaction using an instance of the Transaction class, and save it to the list of transactions. - DONE
- Can print a formatted list of transactions, using an instance of the Statement class. - DONE
*/

describe("Transactions Class", () => {
  let TransactionsManager;
  beforeEach(() => {
    TransactionsManager = new Transactions();
  });

  it("Creates a Transaction class with list of transactions and balance (default to 0)", () => {
    expect(TransactionsManager).toBeInstanceOf(Transactions);
    expect(TransactionsManager.balance).toBe(0);
  });

  it("Can create a new transaction using an instance of the Transaction class, and save it to the list of transactions.", () => {
    TransactionsManager.newTransaction(1000);
    expect(TransactionsManager.balance).toBe(1000);
    expect(TransactionsManager.listOfTransactions.length).toBe(1);
  });

  it("Can print a formatted list of transactions, using an instance of the Statement class.", () => {
    const expectedPrintStatement = 
    `date       || credit  || debit  || balance
11-11-2022 ||         || -500.00 || -500
11-11-2022 || 200.00 ||         || -300
`
    TransactionsManager.newTransaction(-500);
    TransactionsManager.newTransaction(200);
    expect(TransactionsManager.balance).toBe(-300);
    expect(TransactionsManager.listOfTransactions.length).toBe(2);
    expect(TransactionsManager.printStatement()).toEqual(expectedPrintStatement);
  });
});
