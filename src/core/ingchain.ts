import Block from './block/block';
import Chain from './chain/chain';
import Transaction from './transaction/transaction';
import Unspent from './transaction/unspent';

class Ingchain {
    constructor(
        private readonly chain: Chain,
        private readonly block: Block,
        private readonly transaction: Transaction,
        private readonly upspent: Unspent
    ) { }

    mineBlock(account: string) {
        // 이전블록, 트랜잭션, 10번째 블록
        const latestBlock = this.chain.latestBlock()
        const adjustmentBlock = this.chain.getAdjustmentBlock()

        const coinbase = this.transaction.createCoinbase(account, latestBlock.height)
        const newBlock = this.block.mine(latestBlock, [coinbase], adjustmentBlock)
        this.chain.addToChain(newBlock)

        console.info(`블럭이 생성되었습니다.`)

        return this.chain.latestBlock()
    }

    sendTransaction() { }

    getBalance(account: string): number {
        const myUnspentTxOuts = this.upspent.me(account)
        const balance = this.upspent.getAmount(myUnspentTxOuts)
        return balance
    }
}

export default Ingchain