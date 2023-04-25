import { GENESIS } from '@constants/block.constants'
import { BlockInfo } from '@core/block/block.interface'
import CryptoModule from '@core/crypto/crypto.module'

describe('CryptoModule', () => {
    let cryptoModule: CryptoModule

    beforeEach(() => {
        cryptoModule = new CryptoModule()
    })

    describe('SHA256', () => {
        it('SHA256에 인자내용을 평문으로해서 암호화가 되는가', () => {
            const data = '이전 블록을 이용해서 데이터르 만들어야한다.'
            // SHA 256
            // hello world => 16진수 내용으로 뽑히게
            const result = cryptoModule.SHA256(data)
            expect(result.length).toBe(64)
        })

        it('SHA256에서 blockinfo 데이터(객체)로 암호화가 진행되는가', () => {
            
            // blockinfo를 넣기전에 data속성을 빼기
            const blockinfo: BlockInfo = {
                version: GENESIS.version,
                height: GENESIS.height,
                timestamp: GENESIS.timestamp,
                previousHash: GENESIS.previousHash,
                merkleRoot: GENESIS.merkleRoot,
                nonce: GENESIS.nonce,
                difficulty: GENESIS.difficulty,
            }
            
            // 객체 -> blockinfo -> data
            const hash = cryptoModule.SHA256(blockinfo)
            expect(hash).toHaveLength(64)
        })
    })

    describe('HashtoBinary', () => {
        it('이진데이터로 잘 변경되는가?', () => {
            const data = 'hash'
            const hash = cryptoModule.SHA256(data)
            const binary = cryptoModule.hexToBinary(hash)
            expect(binary.length).toBe(256)
        })
    })

    describe('merkleRoot', () => {
        it('genesis 블럭에 있는 data값에서 merkleroot 구하기', () => {
            const merkleroot = cryptoModule.merkleRoot(GENESIS.data)
            console.log(merkleroot)
            expect(merkleroot).toHaveLength(64) // 좀 더 직관적이다
        })
    })
})