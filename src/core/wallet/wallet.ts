import DigitalSignature from './digitalSignature'
import { Accounts } from './wallet.interface'

class Wallet {
    private readonly accounts: Accounts[] = []
    constructor(private readonly digitalSignature: DigitalSignature) { }

    create():Accounts {
        const privateKey = this.digitalSignature.createPrivateKey()
        const publicKey = this.digitalSignature.createPublicKey(privateKey)
        const account = this.digitalSignature.createAccount(publicKey)

        const accounts: Accounts = {
            account,
            publicKey,
            privateKey
        }

        this.accounts.push(accounts)
        return accounts
    }

    set(privateKey: string) {
        const publicKey = this.digitalSignature.createPublicKey(privateKey)
        const account = this.digitalSignature.createAccount(publicKey)

        const accounts: Accounts = {
            account,
            publicKey,
            privateKey
        }

        this.accounts.push(accounts)
        return accounts
    }

    getAccounts() { }

    getPrivate() { }

    receipt() { }

    sign() { }

    verify() { }
}

export default Wallet