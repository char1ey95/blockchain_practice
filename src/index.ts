import { GENESIS } from '@constants/block.constants'
import Block from '@core/block/block'
import { IBlock } from '@core/block/block.interface'
import ProofOfWork from '@core/block/workproof/proofofwork'
import WorkProof from '@core/block/workproof/workproof'
import CryptoModule from '@core/crypto/crypto.module'
import Transaction from '@core/transaction/transaction'
import Unspent from '@core/transaction/unspent'
import DigitalSignature from '@core/wallet/digitalSignature'
import { Receipt } from '@core/wallet/wallet.interface'

const crypto = new CryptoModule()
const digitalSignature = new DigitalSignature()
const proofofwork = new ProofOfWork(crypto)
const workProof = new WorkProof(proofofwork)
const block = new Block(crypto, workProof)
const transaction = new Transaction(crypto)
const unspent = new Unspent(transaction)

// 제네시스

// 코인베이스
const privateKey = '6fb6a1482159a4b05a96636d0a390f7be0f29552c1a2edef79e83998221bc261'
const publicKey = digitalSignature.createPublicKey(privateKey)
const account = digitalSignature.createAccount(publicKey)

// Tx
const coinbase2 = transaction.createCoinbase(account, GENESIS.height)
unspent.createUTXO(coinbase2)
const block2 = block.createBlock(GENESIS, [coinbase2], GENESIS)

// console.log(block2)

// #3
// 이전블록      : 높이가 2인 블록
// 10번째 전블록 : 제네시스

// 3번쨰 블록에 Transaction 넣기
// transaction 프로세스

const receipt: Receipt = {
    sender: {
        account,
        publicKey
    },
    received: '0'.repeat(40),
    amount: 30,
    signature: '0000'
}

const flag = unspent.isAmount(account, receipt.amount)

if (flag) console.log('잔액부족')

const txin1 = unspent.getInput(receipt)
const txout1 = unspent.getOutput(receipt)
const tx1 = transaction.createRow(txin1, txout1)

unspent.createUTXO(tx1)

const coinbase3 = transaction.createCoinbase(account, block2.height)
// const block3 = block.createBlock(block2, [coinbase3, tx1, tx2], GENESIS)
