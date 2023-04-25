import { Hash } from 'types/block'
import cryptojs from 'crypto-js'

class CryptoModule {
    SHA256(data: string): Hash {
        const hash: Hash = cryptojs.SHA256(data).toString()
        return hash as Hash
    }

    // 0    0    => 16진수 : 변화이 쉽기 때문에 사용한다
    // 0000 0000 =>  2진수

    // 16진수
    // 0 1 2 3
    // 4 5 6 7
    // 8 9 A B
    // C D E F

    // 네자리 이진수는 16가지로 나타낼 수 있다(2^4 = 16)
    // 0000 0001 0010 0011
    // 0100 0101 0110 0111
    // 1000 1001 1010 1011
    // 1100 1101 1110 1111
    hexToBinary(hash: Hash): string {
        return ''
    }
}

export default CryptoModule