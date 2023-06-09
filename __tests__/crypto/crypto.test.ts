import { GENESIS } from '@constants/block.constants'
import { BlockData, BlockInfo } from '@core/block/block.interface'
import CryptoModule from '@core/crypto/crypto.module'

describe('CryptoModule', () => {
    let cryptoModule: CryptoModule

    beforeEach(() => {
        cryptoModule = new CryptoModule()
    })

    describe('createReceiptHash', () => {
        it('해쉬화가 되는가', () => {
            // const hash = cryptoModule.createReceiptHash()
            
        })
    })

    describe('SHA256', () => {
        it('SHA256에 인자내용을 평문으로해서 암호화가 되는가', () => {
            const data = '이전 블록을 이용해서 데이터르 만들어야한다.'
            const result = cryptoModule.SHA256(data)
            expect(result.length).toBe(64)
        })

        it('SHA256에서 blockinfo 데이터(객체)로 암호화가 진행되는가', () => {
            const blockinfo: BlockData = {
                version: GENESIS.version,
                height: GENESIS.height,
                timestamp: GENESIS.timestamp,
                previousHash: GENESIS.previousHash,
                merkleRoot: GENESIS.merkleRoot,
                nonce: GENESIS.nonce,
                difficulty: GENESIS.difficulty,
                data: "",
            }

            const data = cryptoModule.createBlockHash(blockinfo)
            const hash = cryptoModule.SHA256(data)
            expect(hash).toHaveLength(64)
        })
    })

    describe('createBlockHash', () => {

        it('createBlockHash에서 blockinfo 데이터로 암호화가 진행되는가?', () => {
            const blockinfo: BlockData = {
                version: GENESIS.version,
                height: GENESIS.height,
                timestamp: GENESIS.timestamp,
                previousHash: GENESIS.previousHash,
                merkleRoot: GENESIS.merkleRoot,
                nonce: GENESIS.nonce,
                difficulty: GENESIS.difficulty,
                data: "",
            }

            const hash = cryptoModule.createBlockHash(blockinfo)
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
            expect(merkleroot).toHaveLength(64)
        })

        it('data값이 TranscationRow일 경우에 잘 생성이 되는가?', () => {
            const data = [
                { hash: 'DC24B19FB7508611ACD8AD17F401753670CFD8DD1BEBEF9C875125E98D82E3D8' },
                { hash: 'DC24B19FB7508611ACD8AD17F401753670CFD8DD1BEBEF9C875125E98D82E3D8' }
            ]
            const merkleroot = cryptoModule.merkleRoot(data)
            expect(merkleroot).toHaveLength(64)
        })

        it('data값이 올바르지 않을 경우 에러가 발생하는가?', () => {
            const data = [
                { hash: 'DC24B19FB7508611ACD8AD17F401753670CFD8DD1BEBEF9C875125E98D82E3D8' },
                { hash: 'DC24B19FB7508611AC8AD17F401753670CFD8DD1BEBEF9C875125E98D82E3D8' }
            ]
            expect(() => {
                cryptoModule.merkleRoot(data)
            }).toThrowError()
        })
    })

    describe('isValidHash', () => {
        it('hash값의 length가 64미만일 경우 에러를 발생시키는가?', () => {
            const notHash = "63f276c89f94976122ea51f5826d8d45e336e332bd5259f6deedbc2c01be62a"
            expect(() => {
                cryptoModule.isValidHash(notHash)
            }).toThrowError(`해시값(hash : ${notHash})이 올바르지 않습니다`)
        })

        it('hash값이 올바르지 않을 경우에 에러를 발생시키는가?', () => {
            const notHash = "63f276c89f94976122ea51f5826d8d45e336e332bd5259f6deedbc2c01be62ag"
            expect(() => {
                cryptoModule.isValidHash(notHash)
            }).toThrowError(`해시값(hash : ${notHash})이 올바르지 않습니다`)
        })

        it('hash값이 아닐경우에 에러를 발생시키는가?', () => {
            const notHash = "00000000"
            expect(() => {
                cryptoModule.isValidHash(notHash)
            }).toThrowError(`해시값(hash : ${notHash})이 올바르지 않습니다`)
        })
    })
})