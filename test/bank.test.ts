import { NormalAccount } from "../src/NormalAccount";
import { Transaction } from "../src/Transaction";
import { SavingsAccount } from "../src/SavingsAccount";
import { InvestmentAccount } from "../src/InvestmentAccount";
describe("Normal account tests", () => {
  let normalAccount: NormalAccount;
  var yesterdaydate = new Date();
  var tomorrowdate = new Date();

  beforeEach(() => {
    normalAccount = new NormalAccount();
    yesterdaydate.setDate(yesterdaydate.getDate() - 1);
    tomorrowdate.setDate(tomorrowdate.getDate() + 1);
  });

  it("should create normal account with balance at 0 and empty transactions list", () => {
    expect(normalAccount.balance).toEqual(0);
    expect(normalAccount.transactions.length).toEqual(0);
  });
  it("should deposit amount to balance", () => {
    normalAccount.deposit(100);
    expect(normalAccount.balance).toEqual(100);
  });
  it("should not deposit amount to balance - wrong data provided", () => {
    normalAccount.deposit(-100);
    expect(normalAccount.balance).toEqual(0);
  });

  it("should withdraw from account", () => {
    normalAccount.deposit(200);
    normalAccount.withdraw(100);
    expect(normalAccount.balance).toEqual(100);
  });

  it("should not withdraw from account - user wants to withdraw too much", () => {
    normalAccount.deposit(200);
    normalAccount.withdraw(1000);
    expect(normalAccount.balance).toEqual(200);
  });

  it("should withdraw from account and deposit", () => {
    normalAccount.deposit(200);
    normalAccount.withdraw(400);
    expect(normalAccount.balance).toEqual(-200);
  });

  it("should not withdraw from account and deposit - wrong data provided", () => {
    normalAccount.deposit(200);
    normalAccount.withdraw(-100);
    expect(normalAccount.balance).toEqual(200);
  });

  it("should add transaction to Transaction list after proper deposit", () => {
    normalAccount.deposit(200);
    expect(normalAccount.transactions.length).toEqual(1);
  });
  it("should add transaction to Transaction list after proper withdraw", () => {
    normalAccount.deposit(200);
    normalAccount.deposit(100);
    expect(normalAccount.transactions.length).toEqual(2);
  });
  it("should add plenty transaction to Transaction list after proper withdraw", () => {
    normalAccount.deposit(200);
    normalAccount.deposit(100);
    normalAccount.deposit(100);
    normalAccount.deposit(100);
    normalAccount.deposit(100);
    normalAccount.deposit(100);
    expect(normalAccount.transactions.length).toEqual(6);
  });

  it("should return Transaction has been done properly message", () => {
    expect(normalAccount.deposit(200)).toEqual(
      "Transaction has been done properly"
    );
  });
  it("should return Transaction has been declined message", () => {
    expect(normalAccount.deposit(-11211)).toEqual(
      "Transaction has been declined!"
    );
  });
  it("should return Transaction has been done properly message", () => {
    normalAccount.deposit(400);
    expect(normalAccount.withdraw(200)).toEqual(
      "Transaction has been done properly"
    );
  });
  it("should return Transaction has been declined message", () => {
    expect(normalAccount.withdraw(-112)).toEqual(
      "Transaction has been declined!"
    );
  });
  it("should return Transaction has been declined message", () => {
    expect(normalAccount.withdraw(600)).toEqual(
      "Transaction has been declined!"
    );
  });

  it("should add plenty transaction to Transaction list after proper withdraw and create statement", () => {
    normalAccount.deposit(200);
    normalAccount.deposit(100);
    normalAccount.deposit(100);
    normalAccount.deposit(100);
    normalAccount.deposit(100);
    normalAccount.deposit(100);
    normalAccount.createStatement(yesterdaydate, tomorrowdate);
    expect(normalAccount.transactions.length).toEqual(6);
  });

  it("Should create proper statement", () => {
    let normalAccount = new NormalAccount();
    normalAccount.deposit(100);
    normalAccount.deposit(222500);
    normalAccount.withdraw(100);
    normalAccount.withdraw(222400);
    normalAccount.withdraw(300);
    let statement: string = normalAccount.createStatement(
      yesterdaydate,
      tomorrowdate
    );
    expect(statement).toContain("date");
    expect(statement).toContain("credit");
    expect(statement).toContain("debit");
    expect(statement).toContain("balance");
    expect(statement).toContain("222500.00");
  });

  it("Should not create statement", () => {
    expect(normalAccount.createStatement(yesterdaydate, tomorrowdate)).toEqual(
      "Transaction list is empty!"
    );
  });

  it("Should calculate available funds using transactions list - 700", () => {
    normalAccount.deposit(200);
    normalAccount.deposit(100);
    normalAccount.deposit(100);
    normalAccount.deposit(100);
    normalAccount.deposit(100);
    normalAccount.deposit(100);
    expect(normalAccount.getAvailabeFunds()).toEqual(700);
  });
  it("Should calculate available funds using transactions list - -500", () => {
    normalAccount.deposit(200);
    normalAccount.withdraw(700);
    expect(normalAccount.getAvailabeFunds()).toEqual(-500);
  });

  it("should create a PDF file with statement", ()=>{

    normalAccount.deposit(200);
    normalAccount.deposit(300);
    expect(normalAccount.printStatementToPDF(yesterdaydate,tomorrowdate,"example.pdf")).toEqual("PDF created properly!")
  })
});

describe("Transaction tests", () => {
  let transaction: Transaction;
  beforeEach(() => {
    transaction = new Transaction(100, true, 100);
  });

  it("should create transaction with actual date", () => {
    expect(transaction.date).toEqual(Date.now());
  });

  it("should create transaction with amount = 100", () => {
    expect(transaction.amount).toEqual(100);
  });

  it("should create transaction with transaction type true", () => {
    expect(transaction.transactionType).toEqual(true);
  });

  it("should create transaction with transaction type false", () => {
    transaction = new Transaction(100, false, 100);
    expect(transaction.transactionType).toEqual(false);
  });

  it("should create transaction with balance = 100", () => {
    expect(transaction.balance).toEqual(100);
  });
});

describe("Savings Account Tests", () => {
  let savingsAccount: SavingsAccount;
  beforeEach(() => {
    savingsAccount = new SavingsAccount();
  });

  it("should create savings account with yearly deposit limit 20000", () => {
    expect(savingsAccount.deposityearlimit).toEqual(20000);
  });

  it("should create savings account with  debit limit 0", () => {
    expect(savingsAccount.debit).toEqual(0);
  });

  it("should not be able to deposit more than 20000", () => {
    savingsAccount.deposit(10000);
    savingsAccount.deposit(5000);
    expect(savingsAccount.deposit(6000)).toEqual(
      "Transaction has been declined!\n Wrong data provided or year limit exceeded!"
    );
  });
});

describe("InvestmentAccountTests", () => {
  let investmentAccount: InvestmentAccount;
  beforeEach(() => {
    investmentAccount = new InvestmentAccount();
  });
  it("should create investment account with debit limit 0", () => {
    expect(investmentAccount.debit).toEqual(0);
  });
  it("should create investment account with actual  intertestStartDate", () => {
    expect(investmentAccount.interestStartDate).toEqual(new Date());
  });
  it("should calculate yearly interest properly", () => {
    const currentDate = new Date();
    const oneYearFromNow = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() - 1,
      currentDate.getDate()
    );
    investmentAccount.interestStartDate = oneYearFromNow;
    investmentAccount.deposit(100);
    expect(investmentAccount.checkInterest()).toEqual(2);
  });

  it("Should return balance with added interest",()=> {
    const currentDate = new Date();
    const oneYearFromNow = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() - 1,
      currentDate.getDate()
    );
    investmentAccount.deposit(100)
    investmentAccount.interestStartDate = oneYearFromNow;
    expect(investmentAccount.getBalanceWithInterest()).toEqual(102)
  })
});
