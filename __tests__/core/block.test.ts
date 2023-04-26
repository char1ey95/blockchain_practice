import { GENESIS } from '@constants/block.constants'
import Block from '@core/block/block'

describe('Block', () => {
    let block: Block

    beforeEach(() => {
        block = new Block()
    })
    describe('createBlockInfo', () => {
        const previousBlock = GENESIS

        it('createBlockInfo 메서드가 존재하는가', () => {
            expect(typeof block.createBlockInfo).toBe('function')
        })

        it('createBlockInfo BlockInfo가 잘 만들어지는가', () => {
            const newBlock = block.createBlockInfo(previousBlock)
            expect(typeof newBlock).toBe('object')
        })

        it('createBlockInfo에서 BlockInfo 내용이 올바른가', () => {
            const newBlock = block.createBlockInfo(previousBlock)
            expect(newBlock.previousHash).toBe(previousBlock.hash)
            expect(newBlock.height).toBe(previousBlock.height + 1)
        })
    })
})