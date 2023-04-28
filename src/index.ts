import { GENESIS } from '@constants/block.constants'
import Block from '@core/block/block'
import { IBlock } from '@core/block/block.interface'
import ProofOfWork from '@core/block/workproof/proofofwork'
import WorkProof from '@core/block/workproof/workproof'
import CryptoModule from '@core/crypto/crypto.module'

const crypto = new CryptoModule()
const proofofwork = new ProofOfWork(crypto)
const workProof = new WorkProof(proofofwork)
const block = new Block(crypto, workProof)

const blockArr: IBlock[] = [GENESIS]

for (let i = 0; i <= 109; i++) {
    const adjustmentBlockNumber = (i > 19) ? (Math.trunc(i / 10) - 1) * 10 - 1 : 0
    blockArr.push(block.createBlock(blockArr[i], 'asdfasdf', blockArr[adjustmentBlockNumber]))
}

const hex = "FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFEBAAEDCE6AF48A03BBFD25E8CD0364140"
const hex2 = "0279BE667EF9DCBBAC55A06295CE870B07029BFCDB2DCE28D959F2815B16F81798"
console.log(Math.pow(10, Math.log10(parseInt(hex, 16))))
console.log(parseInt(hex2, 16))