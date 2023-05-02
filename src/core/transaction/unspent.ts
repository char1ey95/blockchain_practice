import Transaction from './transaction'
import { Receipt, TransactionRow, TxOut, UnspentTxOut, UnspentTxOutPool } from './transaction.interface'

class Unspent {
    private readonly unspentTxOuts: UnspentTxOutPool = []
    constructor(private readonly transaction: Transaction) { }

    getUnspentTxOuts() {
        return this.unspentTxOuts
    }

    createUTXO(transaction: TransactionRow): void {
        const { hash, txOuts } = transaction
        if (!hash) throw new Error('hash가 존재하지 않습니다.')

        // txOut을 가지고 미사용 트랜잭션 객체를 만드는데
        // txouts의 객수가 n 개

        const newUnspentTxOut = txOuts.map((txout: TxOut, index: number) => {
            const unspentTxOut = new UnspentTxOut()
            unspentTxOut.txOutId = hash
            unspentTxOut.txOutIndex = index
            unspentTxOut.account = txout.account
            unspentTxOut.amount = txout.amount
            return unspentTxOut
        })

        this.unspentTxOuts.push(...newUnspentTxOut)
    }

    me(account: string): UnspentTxOut[] {
        const myUnspantTxOuts = this.unspentTxOuts.filter(utxo => (utxo.account = account))
        return myUnspantTxOuts
    }

    getAmount(myUnspentTxOuts: UnspentTxOut[]) {
        return myUnspentTxOuts.reduce((acc, utxo) => acc + utxo.amount, 0)
    }

    isAmount(account: string, senderAmount: number) {
        const myUnspantTxOuts = this.me(account)
        const totalAmount = this.getAmount(myUnspantTxOuts)
        if (totalAmount < senderAmount) return true
        return false
    }

    getInput(receipt: Receipt) {
        const { sender: { account }, amount } = receipt
        const myUnspantTxOuts = this.me(account)

        let targetAmount = 0
        let txins = []
        for (const unspentTxOut of myUnspantTxOuts) {
            targetAmount += unspentTxOut.amount
            const txin = this.transaction.createTxIn(unspentTxOut.txOutIndex, unspentTxOut.txOutId, receipt.signature)
            txins.push(txin)
            if (targetAmount >= amount) break
            // if(targetAmount < amount) continue
        }

        return txins
    }

    getOutput(receipt: Receipt) {
        // me 실행
        // createUTXO와 비슷한 로직
    }
}

export default Unspent