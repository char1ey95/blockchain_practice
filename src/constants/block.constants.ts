import { IBlock } from 'core/block/block.interface';

export const GENESIS: IBlock = {
    version: '1.0.0',
    height: 1, // Block의 높이
    timestamp: 1231006506,
    previousHash: '0'.repeat(64), // 이전 블록의 해쉬 // 32바이트 64글자
    merkleRoot: '0'.repeat(64), // transaction // hash값이 될 것(string) // 32바이트 64글자
    nonce: 0, // PoW를 할 때 필요한 속성 중 하나
    difficulty: 0, // PoW를 할 때 필요한 속성 중 하나
    hash: '0'.repeat(64), // 다양한 속성값을 이용해서 구성할 것
    data: "2009년 1월 3일 더 타임스, 은행들의 두번째 구제금융을 앞두고 있는 U.K 재무장관", // transaction들이 모일 곳, 배열 형태가 될것
}