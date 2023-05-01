import { GENESIS } from '@constants/block.constants'
import Block from '@core/block/block'
import { IBlock } from '@core/block/block.interface'
import ProofOfWork from '@core/block/workproof/proofofwork'
import WorkProof from '@core/block/workproof/workproof'
import CryptoModule from '@core/crypto/crypto.module'
import DigitalSignature from '@core/transaction/digitalSignature'
import Transaction from '@core/transaction/transaction'
import { Receipt, Sender } from '@core/transaction/transaction.interface'

const crypto = new CryptoModule()
const digitalSignature = new DigitalSignature()
const proofofwork = new ProofOfWork(crypto)
const workProof = new WorkProof(proofofwork)
const block = new Block(crypto, workProof)
const transaction = new Transaction(crypto)


// 코인베이스
const privateKey = '6fb6a1482159a4b05a96636d0a390f7be0f29552c1a2edef79e83998221bc261'
const publicKey = digitalSignature.createPublicKey(privateKey)
const account = digitalSignature.createAccount(publicKey)

// Tx
const tx = transaction.createCoinbase(account, GENESIS.height)

const block2 = block.createBlock(GENESIS, [tx], GENESIS)

const receipt: Receipt = {
    sender: {
        account,
        publicKey
    },
    received: '0'.repeat(40),
    amount: 30,
}

// const txin = transaction.createTxIn()
// const txout = transaction.createTxOut()
// transaction.createRow()


// const blockArr: IBlock[] = [GENESIS]



// for (let i = 0; i <= 109; i++) {
//     const adjustmentBlockNumber = (i > 19) ? (Math.trunc(i / 10) - 1) * 10 - 1 : 0
//     blockArr.push(block.createBlock(blockArr[i], 'asdfasdf', blockArr[adjustmentBlockNumber]))
// }

// 코인베이스
// 영수증 --> transaction --> block 생성
