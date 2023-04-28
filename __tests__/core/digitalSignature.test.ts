import CryptoModule from '@core/crypto/crypto.module'
import DigitalSignature from '@core/transaction/digitalSignature'
import { Receipt, Sender } from '@core/transaction/transaction.interface'

describe('디지털서명', () => {
    // 개인키 생성
    // 길이 64인지 체크
    // 두번 실행시켜서 값이 다른지
    // 매번 실행할때 값이 다른지
    // 테스트 코드 작성해보기
    let digitalSignature: DigitalSignature

    beforeEach(() => {
        const crypto = new CryptoModule()
        digitalSignature = new DigitalSignature(crypto)
    })
    describe('createPrivateyKey', () => {
        it('개인키 생성 테스트', () => {
            const privateKey = digitalSignature.createPrivateKey()
            expect(privateKey).toHaveLength(64)
        })

        it('개인키가 실행시마다 다른 값을 나타내는지 테스트', () => {
            if (digitalSignature.createPrivateKey() !== digitalSignature.createPrivateKey()) console.log("성공")
        })

        it('개인키의 길이가 64글자인지 테스트', () => {
            expect(digitalSignature.createPrivateKey().length).toBe(64)
        })

    })

    describe('createPublicKey', () => {

        it('공개키 생성 테스트', () => {
            const privateKey = digitalSignature.createPrivateKey()
            const publicKey = digitalSignature.createPublicKey(privateKey)
            console.log(publicKey)
            console.log(digitalSignature.createPublicKey(privateKey))
            expect(publicKey).toHaveLength(66)
        })
    })

    describe('createAccount', () => {

        it('계정 생성 테스트', () => {
            const privateKey = digitalSignature.createPrivateKey()
            const publicKey = digitalSignature.createPublicKey(privateKey)
            const account = digitalSignature.createAccount(publicKey)
            expect(account).toHaveLength(40)
        })
    })

    describe('sign', () => {
        let sender_privateKey: string
        let sender_publicKey: string
        let sender_account: string
        let received_privateKey: string
        let received_publicKey: string
        let received_account: string
        let receipt: Receipt
        
        beforeEach(() => {
            sender_privateKey = digitalSignature.createPrivateKey()
            sender_publicKey = digitalSignature.createPublicKey(sender_privateKey)
            sender_account = digitalSignature.createAccount(sender_publicKey)
            received_privateKey = digitalSignature.createPrivateKey()
            received_publicKey = digitalSignature.createPublicKey(received_privateKey)
            received_account = digitalSignature.createAccount(received_publicKey)
    
            receipt = {
                sender: {
                    account: sender_account,
                    publicKey: sender_publicKey
                },
                received: received_account,
                amount: 30
            }
        })
        it('sign 만들기', () => {
            const signature = digitalSignature.sign(sender_privateKey, receipt)
            console.log(signature)
            // 304502210081072534c34f3362121ff197a8cebcbeecf31671976bcf4440e6779d206a719002200343d7d74afd8115399128c36803866071db0ad35b3438c23c8762be281faeae
            // 30450221 DER
            // 3x45 전체 바이트를
            // 0x21 R값을 시작하는 바이트
            // 0x20 R값의 길이를 나타내는 바이트
            // R : 0081072534c34f3362121ff197a8cebcbeecf31671976bcf4440e6779d206a719002200343d7d74afd8115399128c36803866071db0ad35b3438c23c8762be281faeae
            // 0081072534c34f3362121ff197a8cebcbeecf31671976bcf4440e6779d206a719002200343d7d74afd8115399128c36803866071db0ad35b3438c23c8762be281faeae

            expect(typeof signature).toBe('object')
            expect(typeof signature.signature).not.toBe(undefined)
        })

        it('검증', () => {
            const receipt2 = digitalSignature.sign(sender_privateKey, receipt)
            // receipt2.signature += 'asdf'
            // 블록체인 네트워크에 receipt2를 넘겨준다.
            receipt2.amount = 100
            const bool = digitalSignature.verify(receipt2)
            console.log(bool)
        })
    })

})