import { VERSION } from '@constants/block.constants';
import { BlockData, BlockInfo, IBlock } from './block.interface';
import CryptoModule from '@core/crypto/crypto.module';
import { TransactionData } from '@core/transaction/transaction.interface';
import WorkProof from './workproof/workproof';

export default class Block {
    constructor(private readonly crypto: CryptoModule, private readonly workProot: WorkProof) { }

    createBlock(previousBlock: IBlock, data: TransactionData, adjustmentBlock: IBlock) {
        const blockdata = this.createBlockData(previousBlock, data)
        this.workProot.run("")
    }

    isValidBlock(block: IBlock): void {
        this.crypto.isValidHash(block.hash)
        const validHash = this.crypto.createBlockHash(block)
        if (validHash !== block.hash) throw new Error(`블록해시값이 올바르지 않습니다. hash : ${validHash}, ${block.hash}`)
    }

    createBlockData(previousBlock: IBlock, data: TransactionData): BlockData {
        const blockinfo = this.createBlockInfo(previousBlock)
        if (data instanceof String) {
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