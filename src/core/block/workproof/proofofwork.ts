import CryptoModule from '@core/crypto/crypto.module';
import { IBlock } from '../block.interface';
import { DiffucultyProps, Proof, ProofOfWorkProps } from './workproof.interface';
import { BLOCK_GENERATION_INTERVAL, DIFFICULTY_ADJUSTMENT_INTERVAL } from '@constants/block.constants';

class ProofOfWork implements Proof {
    constructor(private readonly crypto: CryptoModule) { }
    execute(props: ProofOfWorkProps): IBlock {
        const { blockData, adjustmentBlock } = props
        let block: IBlock = { ...blockData, hash: "" }

        do {
            block.nonce += 1
            block.timestamp = new Date().getTime()

            const difficultyProps = this.getDifficultyProps(block, adjustmentBlock)

            block.difficulty = this.getDifficulty(difficultyProps) // method 결과물 넣을 곳
            block.hash = this.crypto.createBlockHash(block)
        } while (this.crypto.hexToBinary(block.hash).startsWith("0".repeat(block.difficulty)))

        return block as IBlock

        // 연산
        // blockData.nonce = blockData.nonce + 1
        // blockData.timestamp = new Date().getTime()
        // blockData.difficulty = ?
        // // 로직
        // blockData.hash = SHA256 <-- crypto hex
        // hex -> binary blockData.difficulty 비교
        // binary 0이 몇 개인가? blockData.difficulty 값과 같은가?
        // return blockData + hash as IBlock
    }

    getDifficultyProps(block: IBlock, adjustmentBlock: IBlock): DiffucultyProps {
        const { height, timestamp: currentTime } = block
        const { difficulty, timestamp: adjTime } = adjustmentBlock
        return { height, currentTime, adjTime, difficulty }
    }

    // 매개변수 블록높이
    // 이전블록의 난이도
    // 현재블록 Timestamp
    // 10번째전 Timestamp
    getDifficulty(props: DiffucultyProps): number {
        const { height, currentTime, adjTime, difficulty } = props

        if (height <= 0) throw new Error('높이가 0이 들어왔습니다.')
        if (height <= 10) return 0
        if (height <= 20) return 1

        if (height % DIFFICULTY_ADJUSTMENT_INTERVAL !== 0) return difficulty

        // 총 걸린시간 = 현재 블럭 생성시간 - 10번째 전 블럭 생성시간
        const timeTaken = currentTime - adjTime // 1_000 <= 총 걸린시간 <= 12_000 
        const timeExpected = BLOCK_GENERATION_INTERVAL * DIFFICULTY_ADJUSTMENT_INTERVAL
        // 6_000 / 2 => 3_000
        // 6_000 * 2 => 12_000

        if (timeTaken < timeExpected / 2) return difficulty + 1
        if (timeTaken > timeExpected * 2) return difficulty - 1
        return difficulty
        // Block 높이가 20 이하일 경우 체크 X
        // 만드려는 블럭 높이가 10의 배수가 아닐 경우에 10번째전 블럭 난이도로 설정
        // // 현재 블록 생성시간 - 10번째 전의 블록의 생성시간 = 10개 생성하는 총 걸린시간
        // // 목표 시간 1블록당 10분 100분 = 목표시간
        // 총 걸린시간과 목표 시간을 비교
        // 총 걸린시간 < 목표 시간/2 : 이전블록 난이도 + 1
        // 총 걸린시간 > 목표 시간*2 : 이전블록 난이도 - 1
        // 비슷하면 이전블록.난이도 유지
        return 0
    }
}

export default ProofOfWork