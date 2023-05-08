import { Receipt } from '@core/wallet/wallet.interface'
import Transaction from './transaction'
import { TransactionData, TransactionRow, TxIn, TxOut, UnspentTxOut, UnspentTxOutPool } from './transaction.interface'
import { SignatureInput } from 'elliptic'

class Unspent {
    private readonly unspentTxOuts: UnspentTxOutPool = []
    constructor() { }

    getUnspentTxPool() {
        return this.unspentTxOuts
    }

    // delete(txin: TxIn) {
    //     // txoutid, txoutindex

    //     // findIndex : 배열의 요소안에 특정한 요소들이 같은 것을 알고싶다. 리턴값은 인덱스(number)
    //     // 배열 인덱스를 찾는다
    //     const index = this.unspentTxOuts.findIndex((utxo) => {
    //         return utxo.txOutId === txin.txOutId && utxo.txOutIndex === txin.txOutIndex
    //     })
    //     // splice를 이용해서 자른다
    //     this.unspentTxOuts.splice(index)
    // }

    create(hash: string) {
        return (txout: TxOut, txOutIndex: number) => {
            const { amount, account } = txout
            this.unspentTxOuts.push({
                txOutId: hash,
                txOutIndex,
                account,
                amount
            })
        }
    }

    delete(txin: TxIn) {
        const { txOutId, txOutIndex } = txin
        const index = this.unspentTxOuts.findIndex((unspentTxOuts) => {
            return unspentTxOuts.txOutId === txOutId && unspentTxOuts.txOutIndex === txOutIndex
        })

        if(index !== -1) this.unspentTxOuts.splice(index, 1)
    }

    sync(transactions: TransactionData){
        if(typeof transactions === 'string') return

        transactions.forEach(this.update.bind(this))
    }

    update(transaction: TransactionRow): void {
        const { txIns, txOuts, hash } = transaction
        if (!hash) throw new Error('Hash 값이 존재하지 않습니다.')

        txOuts.forEach(this.create(hash))
        txIns.forEach(this.delete.bind(this))
    }

    createUTXO(transaction: TransactionRow): void {
        const { hash, txOuts } = transaction
        if (!hash) throw new Error('hash가 존재하지 않습니다.')

        // txOut을 가지고 미사용 트랜잭션 객체를 만드는데
        // txouts의 객수가 n 개

        // transaction in 삭제
        // transaction.txIns.forEach((v) => this.delete(v))
        // transaction out 생성

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

    getInput(myUnspantTxOuts: UnspentTxOut[], receiptAmount: number, signature: SignatureInput) {
        let targetAmount = 0

        const txins = myUnspantTxOuts.reduce((acc: TxIn[], unspentTxOut: UnspentTxOut) => {
            const { amount, txOutId, txOutIndex } = unspentTxOut
            if (targetAmount >= amount) return acc
            targetAmount += amount
            acc.push({ txOutIndex, txOutId, signature })
            return acc
        }, [] as TxIn[])

        // const { sender: { account }, amount } = receipt
        // const myUnspantTxOuts = this.me(account)

        // let targetAmount = 0
        // let txins = []
        // for (const unspentTxOut of myUnspantTxOuts) {
        //     targetAmount += unspentTxOut.amount
        //     const txin = this.transaction.createTxIn(unspentTxOut.txOutIndex, unspentTxOut.txOutId, receipt.signature)
        //     txins.push(txin)
        //     if (targetAmount >= amount) break
        //     // if(targetAmount < amount) continue
        // }

        return txins
    }


    // 보내는 사람 주소, 보낼 금액, 나의 주소, 나의 금액
    getOutput(received: string, amount: number, sender: string, balance: number) {
        // 내가 가지고 있는 자산에서
        // 보낼 금액을 뻇을때
        // 0 이상일 경우에는 잔돈을
        const txouts: TxOut[] = []
        txouts.push({ account: received, amount })

        if (balance - amount > 0) {
            txouts.push({ account: sender, amount: balance })
        }

        return txouts

        // me 실행
        // createUTXO와 비슷한 로직
        // 예외 1: 코인베이스
        // 예외 2: 총액과 출금액이 같을 때
        // const { sender: { account }, received, amount } = receipt
        // const txOuts = []

        // const myUnspentTxOuts = this.me(account)
        // const totalAmount = this.getAmount(myUnspentTxOuts)
        // const received_txout = this.transaction.createTxOut(received, amount)
        // txOuts.push(received_txout)

        // if (totalAmount - amount > 0) {
        //     const sender_txout = this.transaction.createTxOut(account, totalAmount - amount)
        //     txOuts.push(sender_txout)
        // }

        // return txOuts
    }
}

export default Unspent