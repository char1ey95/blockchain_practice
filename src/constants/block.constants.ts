import { IBlock } from 'core/block/block.interface';

export const GENESIS: IBlock = {
    version: '1.0.0',
    height: 1,
    timestamp: 1231006506,
    previousHash: '0'.repeat(64),
    merkleRoot: 'DC24B19FB7508611ACD8AD17F401753670CFD8DD1BEBEF9C875125E98D82E3D8',
    nonce: 0,
    difficulty: 0,
    hash: '63f276c89f94976122ea51f5826d8d45e336e332bd5259f6deedbc2c01be62a8',
    data: "2009년 1월 3일 더 타임스, 은행들의 두번째 구제금융을 앞두고 있는 U.K 재무장관",
}

export const VERSION = GENESIS.version