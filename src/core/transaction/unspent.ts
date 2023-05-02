import { TransactionRow, TxOut, UnspentTxOut, UnspentTxOutPool } from './transaction.interface'

class Unspent {
    private readonly unspentTxOuts: UnspentTxOutPool = []
    constructor() { }

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
}

export default Unspent