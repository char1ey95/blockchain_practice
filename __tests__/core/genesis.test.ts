import { GENESIS } from '@constants/block.constants'

describe('제네시스 블럭', () => {
    it('제네시스블럭 형태가 올바른가', () => {
        expect(GENESIS.version).toBe('1.0.0')
        expect(GENESIS.difficulty).toBe(0)
        expect(GENESIS.nonce).toBe(0)
    })
})