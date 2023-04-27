import { GENESIS } from '@constants/block.constants'
import Block from '@core/block/block'
import ProofOfWork from '@core/block/workproof/proofofwork'
import WorkProof from '@core/block/workproof/workproof'
import CryptoModule from '@core/crypto/crypto.module'

const crypto = new CryptoModule()

const proofofwork = new ProofOfWork(crypto)
const workProof = new WorkProof(proofofwork)
const block = new Block(crypto, workProof)

const block_1 = block.createBlock(GENESIS, 'transaction', GENESIS)
console.log(block_1)