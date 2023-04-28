import { randomBytes } from "crypto"
import elliptic from "elliptic"

export default class DigitalSignature {
    // 개인키 만들기( 랜덤 32 바이트 )
    createPrivateKey() {
        return randomBytes(32).toString("hex")
    }

    createPublicKey(privateKey: string) {

    }
}