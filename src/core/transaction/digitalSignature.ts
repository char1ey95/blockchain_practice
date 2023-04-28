import { randomBytes } from "crypto"
import elliptic, { SignatureInput } from "elliptic"
import { Receipt } from './transaction.interface'
import CryptoModule from '@core/crypto/crypto.module'

export default class DigitalSignature {
    private readonly ec = new elliptic.ec('secp256k1')
    private readonly crypto = new CryptoModule()
    // 개인키 만들기( 랜덤 32 바이트 )
    createPrivateKey() {
        return randomBytes(32).toString("hex")
    }

    createPublicKey(privateKey: string) {
        const keyPair = this.ec.keyFromPrivate(privateKey)
        const publicKey = keyPair.getPublic().encode('hex', true)
        return publicKey
    }

    createAccount(publicKey: string) {
        const buffer = Buffer.from(publicKey)
        const account = buffer.slice(24).toString()
        return account
    }

    sign(privateKey: string, receipt: Receipt) {
        const keyPair = this.ec.keyFromPrivate(privateKey)
        // receipt 편문 제작... // 객체 모양순서가 다를때
        const receiptHash = this.crypto.createReceiptHash(receipt)
        const signature = keyPair.sign(receiptHash, 'hex').toDER('hex')
        receipt.signature = signature
        return receipt
    }

    verify(receipt: Receipt): boolean {
        const {
            sender: { publicKey },
            signature
        } = receipt

        if(!publicKey || !signature) throw new Error('receipt 내용이 없습니다.')
        const receiptHash = this.crypto.createReceiptHash(receipt)
        return this.ec.verify(receiptHash, signature, this.ec.keyFromPublic(publicKey, 'hex'))
    }
}