import { Account } from "./Account";

export class Customer {
  accounts: Account[];
  constructor(private fullName: string) {
    this.accounts = [];
  }

  createAccount() {
    const account: Account = new Account();
    this.accounts.push(account);
  }

  getAccountsLength(): number {
    return this.accounts.length;
  }
}
