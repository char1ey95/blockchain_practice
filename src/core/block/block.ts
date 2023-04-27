import { VERSION } from '@constants/block.constants';
import { BlockData, BlockInfo, IBlock } from './block.interface';
import CryptoModule from '@core/crypto/crypto.module';
import { TransactionData } from '@core/transaction/transaction.interface';
import WorkProof from './workproof/workproof';

export default class Block {
    constructor(private readonly crypto: CryptoModule, private readonly workProot: WorkProof) { }

    createBlock(previousBlock: IBlock, data: TransactionData, adjustmentBlock: IBlock) {
        const blockdata = this.createBlockData(previousBlock, data)
        // block hash 만드는 것 => 블럭생성
            // block hash를 만들 때 조건이 붙는다 hex => binary 앞에 0이 몇 개 붙어있는가?
                // 블록생성시간 기준으로 난이도 설정( ex. bitcoin은 개당 10분을 목표로 한다 )
                    // 몇 번째 블록이랑 비교할 것인가?
                        // 10 번째 블록이랑 비교
                        // 1 2 3 4 5 6 7 8 9 10
                        // 11부터
        this.workProot.run(blockdata, adjustmentBlock)
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