import jasmine from "jasmine";
import { Account } from "../../src/Account";

describe("Account tests", () => {
  let account: Account;
  beforeEach(() => {
    account = new Account();
  });

  describe("Checking balance after creating new account", () => {
    it("account balance should be 0", () => {
      expect(account.getBalance()).toEqual(0);
    });
  });

  describe("Trying to withdraw money when balance is equal 0", () => {
    it("should throw error", () => {
      expect(() =>
        account.withdrawFunds(200, new Date("2023-07-25"))
      ).toThrowError();
    });
  });

  describe("Checking balance after depositng 500$", () => {
    it("account balance should be equal to 500", () => {
      account.depositFunds(500, new Date("2023-07-25"));
      expect(account.getBalance()).toEqual(500);
    });
  });

  describe("Checking balance after depositng 500$ and withdrawing 200$ ", () => {
    it("account balance should be equal to 200", () => {
      account.depositFunds(500, new Date("2023-07-25"));
      account.withdrawFunds(200, new Date("2023-07-25"));
      expect(account.getBalance()).toEqual(300);
    });
  });

  describe("Checking number of transaction after depositng 500$ and withdrawing 200$", () => {
    it("transactions length should be equal to 2", () => {
      account.depositFunds(500, new Date("2023-07-25"));
      account.withdrawFunds(200, new Date("2023-07-25"));
      expect(account.getTransactions().length).toEqual(2);
    });
  });

  describe("Checking account statement", () => {
    it("should return correct description", () => {
      account.depositFunds(200, new Date("2023-07-21"));
      account.withdrawFunds(200, new Date("2023-07-22"));
      account.depositFunds(300, new Date());
      expect(account.getTransactions()[0].getTransactionDescription()).toEqual(
        "7/21/2023 || 200    ||         || 200"
      );
    });
  });

  describe("Checking account statement", () => {
    it("should return correct description", () => {
      account.depositFunds(200, new Date("2023-07-21"));
      account.withdrawFunds(200, new Date("2023-07-22"));
      account.depositFunds(300, new Date());
      expect(account.getTransactions()[0].getTransactionDescription()).toEqual(
        "7/21/2023 || 200    ||         || 200"
      );
    });
  });

  describe("Checking account statement", () => {
    it("should return the correct date for the first transaction", () => {
      account.depositFunds(200, new Date("2023-07-21"));
      account.withdrawFunds(200, new Date("2023-07-22"));
      account.depositFunds(300, new Date());
      expect(account.getTransactions()[0].getDate()).toEqual(
        new Date("2023-07-21")
      );
    });
  });

  describe("Checking account statement", () => {
    it("should return the correct date for the second transaction", () => {
      account.depositFunds(200, new Date("2023-07-21"));
      account.withdrawFunds(200, new Date("2023-07-22"));
      account.depositFunds(300, new Date("2023-07-25"));
      expect(account.getTransactions()[1].getDate()).toEqual(
        new Date("2023-07-22")
      );
    });
  });

  describe("Checking account statement", () => {
    it("should return the correct date for the second transaction", () => {
      account.depositFunds(200, new Date("2023-07-21"));
      account.withdrawFunds(200, new Date("2023-07-22"));
      account.depositFunds(300, new Date("2023-07-25"));
      expect(account.getTransactions()[2].getDate()).toEqual(
        new Date("2023-07-25")
      );
    });
  });

  describe("Checking account statement between two dates", () => {
    it("should be equal to 2", () => {
      account.depositFunds(200, new Date("2023-07-21"));
      account.withdrawFunds(200, new Date("2023-07-22"));
      account.depositFunds(300, new Date("2023-07-25"));
      let transactions = account.getTransactionsBetweenTwoDates(
        new Date("2023-07-20"),
        new Date("2023-07-22")
      ).length;
      expect(transactions).toEqual(2);
    });
  });

  describe("Checking account statement between two dates", () => {
    it("should be equal to 3", () => {
      account.depositFunds(200, new Date("2023-07-21"));
      account.withdrawFunds(200, new Date("2023-07-22"));
      account.depositFunds(300, new Date("2023-07-25"));
      let transactions = account.getTransactionsBetweenTwoDates(
        new Date("2023-07-20"),
        new Date("2023-07-26")
      ).length;
      expect(transactions).toEqual(3);
    });
  });
});
