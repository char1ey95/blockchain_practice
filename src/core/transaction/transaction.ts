import { TransactionRow, TxIn, TxOut } from './transaction.interface'
import CryptoModule from '@core/crypto/crypto.module'
import { Hash } from 'types/block'
import { SignatureInput } from 'elliptic'
import { Receipt } from '@core/wallet/wallet.interface'

class Transaction {
    private readonly REWARD = 50
    constructor(private readonly crypto: CryptoModule) { }

    create(receipt: Receipt) {
        const totalAmount = 50
        // txin => 영수증에 있는 sender의 잔액을 확인해야한다.
        const txin1 = this.createTxIn(1, '', receipt.signature)
        const txout_sender = this.createTxOut(receipt.sender.account, totalAmount - receipt.amount)
        const txout_received = this.createTxOut(receipt.received, receipt.amount)
        return this.createRow([txin1], [txout_sender, txout_received])
    }

    createTxOut(account: string, amount: number): TxOut {
        if (account.length !== 40) throw new Error("Account 형식이 올바르지 않습니다.")
        const txout = new TxOut()
        txout.account = account
        txout.amount = amount
        return txout
    }

    serializeTxOut(txOut: TxOut): Hash {
        const { account, amount } = txOut
        const text = [account, amount].join('')
        return this.crypto.SHA256(text)
    }

    createTxIn(txOutIndex: number, txOutId?: string, signature?: SignatureInput): TxIn {
        const txIn = new TxIn()
        txIn.txOutIndex = txOutIndex
        txIn.txOutId = txOutId
        txIn.signature = signature
        return txIn
    }

    serializeTxIn(txIn: TxIn): Hash {
        const { txOutIndex } = txIn
        const text = [txOutIndex].join('')
        return this.crypto.SHA256(text)
    }

    createRow(txIns: TxIn[], txOuts: TxOut[]) {
        const transactionRow = new TransactionRow()
        transactionRow.txIns = txIns
        transactionRow.txOuts = txOuts
        transactionRow.hash = this.serializeRow(transactionRow)
        return transactionRow
    }

    serializeTx<T>(data: T[], callback: (item: T) => string) {
        return data.reduce((acc: string, item: T) => acc + callback(item), '')
    }

    serializeRow(row: TransactionRow) {
        const { txIns, txOuts } = row
        const txoutText = this.serializeTx<TxOut>(txOuts, (item) => this.serializeTxOut(item))
        const txinText = this.serializeTx<TxIn>(txIns, (item) => this.serializeTxIn(item))

        return this.crypto.SHA256(txoutText + txinText)
    }

    createCoinbase(account: string, latestBlockHeight: number) {
        const txin = this.createTxIn(latestBlockHeight + 1)
        const txout = this.createTxOut(account, this.REWARD)
        return this.createRow([txin], [txout])
    }
}

export default Transaction



