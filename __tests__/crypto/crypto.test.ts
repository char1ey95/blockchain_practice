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
    })

    describe('HashtoBinary', () => {
        it('이진데이터로 잘 변경되는가?', () => {
            const data = 'hash'
            const hash = cryptoModule.SHA256(data)
            const binary = cryptoModule.hexToBinary(hash)
            expect(binary.length).toBe(256)
        })
    })
})