import { BlockData, IBlock } from '../block.interface'
import { Proof, ProofProps } from './workproof.interface'

class WorkProof {
    constructor(private readonly proof: Proof) { }
    run(blockData: BlockData, adjustmentBlock: IBlock) {
        // 이곳에 PoW를 추가하면 block.ts에 적는 것과 크게 다르지 않다.
        const props: ProofProps = { blockData, adjustmentBlock }
        this.proof.execute(props)
    }
}

export default WorkProof