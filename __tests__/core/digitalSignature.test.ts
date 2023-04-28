import DigitalSignature from '@core/transaction/digitalSignature'

describe('디지털서명', () => {
    // 개인키 생성
    // 길이 64인지 체크
    // 두번 실행시켜서 값이 다른지
    // 매번 실행할때 값이 다른지
    // 테스트 코드 작성해보기
    let digitalSignature: DigitalSignature

    beforeEach(() => {
        digitalSignature = new DigitalSignature()
    })
    describe('createPrivateyKey', () => {
        it('개인키 생성 테스트', () => {
            const privateKey = digitalSignature.createPrivateKey()
            console.log(privateKey)
        })

        it('개인키가 실행시마다 다른 값을 나타내는지 테스트', () => {
            if(digitalSignature.createPrivateKey() !== digitalSignature.createPrivateKey() ) console.log("성공")
        })

        it('개인키의 길이가 64글자인지 테스트', () => {
            expect(digitalSignature.createPrivateKey().length).toBe(64)
        })

    })

    describe('createPublicKey', () => {

        it('공개키 생성 테스트', () => {
            const privateKey = digitalSignature.createPrivateKey()
            console.log(privateKey)
    
            const publicKey = digitalSignature.createPublicKey(privateKey)
            console.log(publicKey)
        })
    })

    describe('createAccount', () => {

        it('계정 생성 테스트', () => {
            const privateKey = digitalSignature.createPrivateKey()
            console.log(privateKey)
    
            const publicKey = digitalSignature.createPublicKey(privateKey)
            console.log(publicKey)

            const account = digitalSignature.createAccount(publicKey)
            console.log("account:::", account)
        })
    })

    describe('sign', () => {
        it('서명 테스트 하기', () => {
            // digitalSignature.sign()
        })
    })
})