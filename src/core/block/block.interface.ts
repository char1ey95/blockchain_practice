import { TransactionData } from 'core/transaction/transaction.interface'
import { Difficulty, Height, Timestamp, Hash } from "types/block"

export class BlockInfo {
    public version!: string
    public height!: Height
    public timestamp!: Timestamp
    public previousHash!: Hash
    public merkleRoot!: Hash
    public nonce!: number
    public difficulty!: Difficulty
}

// 해쉬화를 진행할 때 data는 필요가 없기 떄문에
export class BlockData extends BlockInfo {
    public data!: TransactionData
}

// Hash값은 나중에 만들어야한다.
// Hash는 32byte, 암호화는 평문이 필요하다.
// 평문의 data가 블록을 만드는 요소인 version, height, ... 이 필요하다.
// 따라서 위의 data가 먼저 생겨야 hash가 생길 수 있다.
export class IBlock extends BlockData {
    public hash!: Hash
}