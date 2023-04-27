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

// PoW가 정확히 잘 되는지 한번 검증해보기
// Test 코드 작성