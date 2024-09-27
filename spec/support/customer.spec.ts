import { Customer } from "../../src/Customer";
import jasmine from "jasmine";

describe("Customer tests", () => {
  let customer: Customer;
  beforeEach(() => {
    customer = new Customer("Marlena Luczak");
  });

  describe("Checking length of accounts array for customer without any account", () => {
    it("accounts length should be 0", () => {
      expect(customer.getAccountsLength()).toEqual(0);
    });
  });

  describe("Creating one account", () => {
    it("accounts length should be 1", () => {
      customer.createAccount();
      expect(customer.getAccountsLength()).toEqual(1);
    });
  });

  describe("Creating two accounts", () => {
    it("accounts length should be 2", () => {
      customer.createAccount();
      customer.createAccount();
      expect(customer.getAccountsLength()).toEqual(2);
    });
  });

});
