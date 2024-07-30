class Bank {
    #accounts
    constructor() {
        this.#accounts = []
    }

    addAccount(account) {
        const isObject = typeof account === 'object'
        const firstName = account.firstName
        const lastName = account.lastName
        const invalidName = ''

        if (!isObject ||
            firstName === undefined ||
            lastName === undefined ||
            firstName === invalidName ||
            lastName === invalidName
        ) {
            throw 'Invalid entry'
           }
        this.#accounts.push(account)
    }

    get accounts() {
        return [...this.#accounts]
    }
}
const bankInst = new Bank()


export default Bank