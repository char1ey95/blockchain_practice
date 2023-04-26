import { VERSION } from '@constants/block.constants';
import { BlockInfo, IBlock } from './block.interface';
import CryptoModule from '@core/crypto/crypto.module';

export default class Block {
    constructor(private readonly crypto: CryptoModule) { }

    isValidBlock(block: IBlock): void {
        // block에 있는 hash값이 hash 형태와 일치하는가
        // crypto.createBlockHash() === block.hash 값이 같으면 된다.
        // 
    }

    // Block 인스턴스가 생성되면, BlockInfo 모양의 객체를 반환해준다.
    createBlockInfo(previousBlock: IBlock): BlockInfo {
        // previousBlock의 검증
        // 이전 블록의 모든 정보를 담고 있는 hash를 검증하면 된다.

        // const blockInfo: BlockInfo = {
        //     version: VERSION,
        //     height: previousBlock.height + 1,
        //     timestamp: new Date().getTime(),
        //     previousHash: previousBlock.hash,
        //     nonce: 0,
        //     difficulty: 0,
        // }

        // 위의 방법 보다 아래의 방법을 많이 쓰긴한다.
        // 1. 연산이 들어 갈때가 좋다.
        // 2. BlockInfo 클래스에 !를 빼고 default 값을 설정해둔다.

        const blockInfo = new BlockInfo()
        blockInfo.version = VERSION
        blockInfo.height = previousBlock.height + 1
        blockInfo.timestamp = new Date().getTime()
        blockInfo.previousHash = previousBlock.hash

        return blockInfo
    }
}