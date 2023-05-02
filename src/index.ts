import { GENESIS } from '@constants/block.constants'
import Block from '@core/block/block'
import { IBlock } from '@core/block/block.interface'
import ProofOfWork from '@core/block/workproof/proofofwork'
import WorkProof from '@core/block/workproof/workproof'
import CryptoModule from '@core/crypto/crypto.module'
import DigitalSignature from '@core/transaction/digitalSignature'
import Transaction from '@core/transaction/transaction'
import { Receipt, Sender } from '@core/transaction/transaction.interface'
import Unspent from '@core/transaction/unspent'

const crypto = new CryptoModule()
const digitalSignature = new DigitalSignature()
const proofofwork = new ProofOfWork(crypto)
const workProof = new WorkProof(proofofwork)
const block = new Block(crypto, workProof)
const transaction = new Transaction(crypto)
const unspent = new Unspent()

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
    amount: 60,
    signature:'0000'
}

const myutxo = unspent.me(account)
console.log(myutxo)

const totalAmount = unspent.getAmount(myutxo)
console.log(totalAmount, receipt.amount)

if(unspent.isAmount(totalAmount, receipt.amount)) console.log('잔액부족')

// TxIn
const txin1 = transaction.createTxIn(1, '', receipt.signature)

// TxOut
// 현재 보내는 사람은 50
// 받는 사람은 30
// 보내는 사람의 잔액은 20
// sender 총 수량  - amount

const txout_sender = transaction.createTxOut(receipt.sender.account, 50 - receipt.amount)
const txout_received = transaction.createTxOut(receipt.received, receipt.amount)
const tx1 = transaction.createRow([txin1], [txout_sender, txout_received])

const tx2 = transaction.create(receipt)

const coinbase3 = transaction.createCoinbase(account, block2.height)
const block3 = block.createBlock(block2, [coinbase3, tx1, tx2], GENESIS)

// console.log(block3)

// sender <-- 20 + 50
// receiver <-- 30

// 코인베이스
// 영수증 --> transaction --> block 생성