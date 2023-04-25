import CryptoModule from '@core/crypto/crypto.module'

describe('CryptoModule', () => {
    let cryptoModule: CryptoModule

    beforeEach(() => {
        cryptoModule = new CryptoModule()
    })

    describe('SHA256', () => {
        it('SHA256에 인자내용을 평문으로해서 암호화가 되는가', () => {
            const data = "hello world"
            // SHA 256
            // hello world => 16진수 내용으로 뽑히게
            const result = cryptoModule.SHA256(data)
            expect(result.length).toBe(64)
        })
    })
})