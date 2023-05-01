// BitCoin 총 발행량 지정되어있다.
// 50 BTC
// 4년마다 반감기 진행 50 => 25 => 12.5 => 6.25 => 3.125 ....
// 원래는 수수료도 지불

import { IBlock } from '@core/block/block.interface'
import { TransactionRow, TxIn, TxOut } from './transaction.interface'
import CryptoModule from '@core/crypto/crypto.module'
import { Hash } from 'types/block'
import { SignatureInput } from 'elliptic'

// 컴퓨터는 소수점 계산이 어렵기 때문에
// 1 BTC === 10^18로 구현되어있다.

// 구현할 기능
// 마이닝 성공시 보상주기

class Transaction {
    private readonly REWARD = 50
    constructor(private readonly crypto: CryptoModule) { }
    createTxOut(account: string, amount: number): TxOut {
        // publicKey => 32바이트(64글자)
        // account => publicKey에서 12바이트 제거 => 20바이트(40글자)
        // account가 40글자가 아니라면, account가 올바르지 않다.
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

    serializeTx<T>(data: T[], callback: (item: T) => string){
        return data.reduce((acc: string, item: T) => acc + callback(item), '')
    }

    serializeRow(row: TransactionRow) {
        const { txIns, txOuts } = row
        // if(txIns !== )
        const txoutText = this.serializeTx<TxOut>(txOuts, (item) => this.serializeTxOut(item))
        const txinText = this.serializeTx<TxIn>(txIns, (item) => this.serializeTxIn(item))
        // const txoutText = txOuts.reduce((acc: string, v: TxOut) => {
        //     return acc + this.serializeTxOut(v)
        // }, '')
        // const txinText = txIns.reduce((acc: string, v: TxIn) => {
        //     return acc + this.serializeTxIn(v)
        // }, '')

        return this.crypto.SHA256(txoutText + txinText)
    }

    // 누구에게 보상을 줘야할지 알아야한다.
    createCoinbase(account: string, latestBlockHeight: number) {
        const txin = this.createTxIn(latestBlockHeight + 1)
        const txout = this.createTxOut(account, this.REWARD)
        return this.createRow([txin], [txout])
    }
}

export default Transaction



