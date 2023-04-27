import { VERSION } from '@constants/block.constants';
import { BlockData, BlockInfo, IBlock } from './block.interface';
import CryptoModule from '@core/crypto/crypto.module';
import { TransactionData } from '@core/transaction/transaction.interface';

export default class Block {
    constructor(private readonly crypto: CryptoModule) { }

    // 새 블럭을 생성하기 위해서 이전 블록과 트랜잭션 데이터가 필요
    createBlock(previousBlock: IBlock, data: TransactionData, adjustmentBlock: IBlock) {
        const blockdata = this.createBlockData(previousBlock, data)
        // 로직 부분 시작
        // 로직: 작업증명(Proof of Work)
        // PoW, PoS, PoA 등등...
        // 작업증명 - 블록을 만들 수 있는지, 증명하는 것
        
        // PoW(작업증명, Proof of Work): 누가 더 작업을 빠르게 하는지
        // PoS(지분증명, Proof of Stake): 많이 가진 사람이 블록을 더 생성
        // PoA(권한증명, Proof of Authority): 선택한 사람만 블록을 생성

        // 블록체인
        // public - PoW, PoS
        // private - PoA | ex) COOV
            // 노드 갯수가 현저히 적다 => 속도가 빠르다 => 보안이 약하다(보안성)

        // PoW로 진행

        // 증명 로직

        // OOP를 사용 => 전략패턴 - 증명방식을 쉽게 갈아 끼우기 위해서
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