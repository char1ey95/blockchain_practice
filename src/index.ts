import { GENESIS } from '@constants/block.constants'
import Block from '@core/block/block'
import { IBlock } from '@core/block/block.interface'
import ProofOfWork from '@core/block/workproof/proofofwork'
import WorkProof from '@core/block/workproof/workproof'
import CryptoModule from '@core/crypto/crypto.module'
import Transaction from '@core/transaction/transaction'
import Unspent from '@core/transaction/unspent'
import DigitalSignature from '@core/wallet/digitalSignature'
import Wallet from '@core/wallet/wallet'
import { Receipt } from '@core/wallet/wallet.interface'

const crypto = new CryptoModule()
const digitalSignature = new DigitalSignature()
const proofofwork = new ProofOfWork(crypto)
const workProof = new WorkProof(proofofwork)
const block = new Block(crypto, workProof)
const transaction = new Transaction(crypto)
const unspent = new Unspent(transaction)
const accounts = new Wallet(digitalSignature)

const sender = accounts.create()
const receipt = accounts.receipt("0000", 30) // length 길이 체크 예외처리 0000은 네자리이므로 불가