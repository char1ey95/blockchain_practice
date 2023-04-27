import ProofOfStake from './proofofstake'
import ProofOfWork from './proofofwork'
import { Proof } from './workproof.interface'

class WorkProof {
    constructor(private readonly work: Proof) { }
    run(type: string) {
        // 이곳에 PoW를 추가하면 block.ts에 적는 것과 크게 다르지 않다.
        this.work.execute()
    }
}

// const work = new ProofOfWork()
const work = new ProofOfStake()
new WorkProof(work)

export default WorkProof