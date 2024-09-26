const Account = require("./account.js");

const account = new Account();
account.credit(4000);
account.credit(3000);
account.credit(2000);
account.debit(1000);

account.printStatement();