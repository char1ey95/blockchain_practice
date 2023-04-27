import ProofOfStake from '@core/block/workproof/proofofstake'
import ProofOfWork from '@core/block/workproof/proofofwork'
import WorkProof from '@core/block/workproof/workproof'
import { Proof } from '@core/block/workproof/workproof.interface'

describe('WorkProof', () => {
    let workProof: WorkProof
    let proof: Proof

    describe('ProofOfWork', () => {
        beforeEach(() => {
            proof = new ProofOfWork()
            workProof = new WorkProof(proof)
        })
        it('PoW: console.log가 잘 찍히는가', () => {
            workProof.run()
        })
    })

    describe('ProofOfStake', () => {
        beforeEach(() => {
            // proof = new ProofOfStake()
            // workProof = new WorkProof(proof)
        })
        it('PoS: console.log가 잘 찍히는가', () => {
            // workProof.run()
        })
    })
})