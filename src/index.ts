import { Account } from "./Account";

const account: Account = new Account();
account.depositFunds(200, new Date("2023-07-21"));
account.withdrawFunds(200, new Date("2023-07-22"));
account.depositFunds(300, new Date());
console.log(account.getAccountStatement());
