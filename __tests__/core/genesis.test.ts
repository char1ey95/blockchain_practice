import { GENESIS } from '@constants/block.constants'

describe('제네시스 블럭', () => {
    it('제네시스블럭 형태가 올바른가', () => {
        expect(GENESIS.version).toBe('1.0.0')
        expect(GENESIS.height).toBe(1)
        expect(GENESIS.timestamp).toBe(1231006506)
        expect(GENESIS.difficulty).toBe(0)
        expect(GENESIS.nonce).toBe(0)
        expect(GENESIS.hash).toBe('0'.repeat(64))
        expect(GENESIS.merkleRoot).toBe('0'.repeat(64))
        expect(GENESIS.previousHash).toBe('0'.repeat(64))
        expect(GENESIS.data).toBe('2009년 1월 3일 더 타임스, 은행들의 두번째 구제금융을 앞두고 있는 U.K 재무장관')
    })
})