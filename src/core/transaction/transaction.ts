// BitCoin 총 발행량 지정되어있다.
// 50 BTC
// 4년마다 반감기 진행 50 => 25 => 12.5 => 6.25 => 3.125 ....
// 원래는 수수료도 지불

import { IBlock } from '@core/block/block.interface'
import { TransactionRow, TxIn, TxOut } from './transaction.interface'

// 컴퓨터는 소수점 계산이 어렵기 때문에
// 1 BTC === 10^18로 구현되어있다.

// 구현할 기능
// 마이닝 성공시 보상주기

class Transaction {
    private readonly REWARD = 50

    createTxOut(account: string, amount: number) {
        // publicKey => 32바이트(64글자)
        // account => publicKey에서 12바이트 제거 => 20바이트(40글자)
        // account가 40글자가 아니라면, account가 올바르지 않다.
        if (account.length !== 40) throw new Error("Account 형식이 올바르지 않습니다.")
        const txout = new TxOut()
        txout.account = account
        txout.amount = amount
        return txout
    }

    createTxIn(txOutIndex: number) {
        const txIn = new TxIn()
        txIn.txOutIndex = txOutIndex
        return txIn
    }

    createRow(txIns: TxIn[], txOuts: TxOut[]) {
        const transactionRow = new TransactionRow()
        transactionRow.txIns = txIns
        transactionRow.txOuts = txOuts
        return transactionRow
    }

    // 누구에게 보상을 줘야할지 알아야한다.
    createCoinbase(account: string, latestBlock: IBlock) {
        const txin = this.createTxIn(latestBlock.height + 1)
        const txout = this.createTxOut(account, this.REWARD)
        return this.createRow([txin], [txout])
    }
}

export default Transaction



