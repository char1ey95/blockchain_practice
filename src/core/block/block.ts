import { VERSION } from '@constants/block.constants';
import { BlockData, BlockInfo, IBlock } from './block.interface';
import CryptoModule from '@core/crypto/crypto.module';
import { TransactionData, TransactionRow } from '@core/transaction/transaction.interface';

export default class Block {
    constructor(private readonly crypto: CryptoModule) { }

    isValidBlock(block: IBlock): void {
        this.crypto.isValidHash(block.hash)
        const validHash = this.crypto.createBlockHash(block)
        if (validHash !== block.hash) throw new Error(`블록해시값이 올바르지 않습니다 hash : ${validHash}, ${block.hash}`)
    }

    // blockData
    // 1. createBlockInfo  <-- 이전블록
    createBlockData(previousBlock: IBlock, data: TransactionData): BlockData {
        const blockinfo = this.createBlockInfo(previousBlock)
        if(data instanceof String) {
            data
        } else if (Array.isArray(data)) {
            data
        }

        return { ...blockinfo, merkleRoot: '', data } as BlockData
    }

    createBlockInfo(previousBlock: IBlock): BlockInfo {
        this.isValidBlock(previousBlock)

        const blockInfo = new BlockInfo()

        blockInfo.version = VERSION
        blockInfo.height = previousBlock.height + 1
        blockInfo.timestamp = new Date().getTime()
        blockInfo.previousHash = previousBlock.hash

        return blockInfo
    }
}