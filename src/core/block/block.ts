import { VERSION } from '@constants/block.constants';
import { BlockInfo, IBlock } from './block.interface';
import CryptoModule from '@core/crypto/crypto.module';

export default class Block {
    constructor(private readonly crypto: CryptoModule) { }

    isValidBlock(block: IBlock): void {
        this.crypto.isValidHash(block.hash)
        const validHash = this.crypto.createBlockHash(block)
        if (validHash === block.hash) {
            console.log('성공 : ',validHash, block.hash)
        } else {
            console.log('실패 : ',validHash, block.hash)
        }
    }

    // Block 인스턴스가 생성되면, BlockInfo 모양의 객체를 반환해준다.
    createBlockInfo(previousBlock: IBlock): BlockInfo {
        const blockInfo = new BlockInfo()
        blockInfo.version = VERSION
        blockInfo.height = previousBlock.height + 1
        blockInfo.timestamp = new Date().getTime()
        blockInfo.previousHash = previousBlock.hash

        return blockInfo
    }
}