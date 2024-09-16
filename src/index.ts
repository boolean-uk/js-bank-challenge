import { Bank } from "../src/bank";
import { CheckingAccount } from "./checkingaccount";
import { InvestmentAccount } from "./investmentaccount";
import { SavingAccount } from "./savingaccount";

const prompt = require('prompt-sync')();

const rl = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
});

const bank = new Bank()
let areYouStillUsingApp = 'y'

console.log('Welcome to BooleanUK Bank!')
console.log('To enter your account log in... ')
const answer = prompt('Put your birth date in the format 01-01-2019 : ')
const idNumber = new Date(answer).valueOf()
if (!bank.ifClientRegistered(idNumber)){
    console.log("You are not register, register to use our services :)")
    areYouStillUsingApp = 'n'
} else { areYouStillUsingApp = 'y' }

while(areYouStillUsingApp === 'y'){
    
    const client = bank.getClientByID(idNumber)
    let areYouBanking = true;
    let account
    console.log('You are log in as ' + client?.fullName)
    if(bank.getAccountList(idNumber)){
        console.log(bank.getAccountList(idNumber))
        console.log('Choose your account\n')
        const accountName = prompt('(Please write a name o your account): ')
        if(accountName){
            account = bank.getAccountByName(idNumber, accountName)
        }
    }
    else {
        const yOrn = prompt('You donot have opened any accounts do you want to open new one? [y/n] ')
        if(yOrn === 'n'){
            areYouStillUsingApp = 'n'
            console.log('Goodbye! Thank you for using BooleanUK Bank.');
            break;
        } 
        else {
            const type = prompt('Choose the type of account [Saving, Investment, Checking] : ') 
            areYouBanking = false
            switch (type) {
                case 'Saving':
                    const accountS = new SavingAccount()
                    bank.createAccount(accountS, idNumber)
                    console.log("Saving account has been created")
                    account = accountS
                    break;
    
                case 'Investment':
                    const accountI = new InvestmentAccount()
                    bank.createAccount(accountI, idNumber)
                    console.log("Investement account has been created")
                    account = accountI
                    break;
    
                case 'Checking':
                    const accountC = new CheckingAccount()
                    bank.createAccount(accountC, idNumber)
                    console.log("Checking account has been created")
                    account = accountC
                    break;
    
                default:
                    console.log('Invalid option. Please choose again.');
                    break;
            }
        }

    }

    if(account){
    while (areYouBanking) {
        const userInput = prompt(
            'Choose an option:\n' +
            '1. Withdraw\n' +
            '2. Deposit\n' +
            '3. Generate Financial Statement\n' +
            '4. Open another account\n' +
            '5. Exit \n'
        );

        switch (userInput) {
            case '1':
                console.log('How much money you want to withdraw?')
                const withdrawAmount = prompt('give an amount:')
                const datewithdraw = prompt('give date if it was not today)')
                if(datewithdraw){
                    console.log(account.withdraw(withdrawAmount, datewithdraw));
                }else console.log(account.withdraw(withdrawAmount));
                break;

            case '2':
                console.log('How much money you want to deposit?')
                const depositAmount = prompt('give an amount:')
                const datedeposit = prompt('give date if it was not today)')
                if(datedeposit){
                    console.log(account.deposit(depositAmount, datedeposit));
                }else console.log(account.deposit(depositAmount));
                break;

            case '3':
                account.generateStatement()
                break;

            case '4':
                const type = prompt('Choose the type of account [Saving, Investment, Checking] : ') 
                switch (type) {
                    case 'Saving':
                        const accountS = new SavingAccount()
                        bank.createAccount(accountS, idNumber)
                        console.log("Saving account has been created")
                        account = accountS
                        break;
        
                    case 'Investment':
                        const accountI = new InvestmentAccount()
                        bank.createAccount(accountI, idNumber)
                        console.log("Investment account has been created")
                        account = accountI
                        break;
        
                    case 'Checking':
                        const accountC = new CheckingAccount()
                        bank.createAccount(accountC, idNumber)
                        console.log("Checking account has been created")
                        account = accountC
                        break;
        
                    default:
                        console.log('Invalid option. Please choose again.');
                        break;
                }
                break;

            case '5':
                console.log('Goodbye! Thank you for using BooleanUK Bank.');
                areYouBanking = false;
                areYouStillUsingApp = 'n'
                break;

            default:
                console.log('Invalid option. Please choose again.');
                break;
        }
    }
}
        
}


