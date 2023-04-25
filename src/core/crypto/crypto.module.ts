import { Hash } from 'types/block'
import cryptojs from 'crypto-js'
import merkle from "merkle"
import { TransactionData, TransactionRow } from '@core/transaction/transaction.interface'
import { BlockInfo } from '@core/block/block.interface'

class CryptoModule {

    createBlockHash(data: BlockInfo): string {
        // data => object => sort => string => SHA256
        const value = Object.values(data).sort().join('')
        return this.SHA256(value)
    }

    SHA256(data: string): Hash {
        const hash: Hash = cryptojs.SHA256(data).toString()
        return hash as Hash
    }

    // 0    0    => 16(2^4)진수 : 변화이 쉽기 때문에 사용한다, 한글자당 4bit 0.5byte
    // 0000 0000 =>  2(2^1)진수 : 한글자당 1bit 0.2byte

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
        let binary = ''
        for (let i = 0; i < hash.length; i += 2) {
            const hexByte = hash.substr(i, 2) // i 기준 2글자씩 자른다
            const decimal = parseInt(hexByte, 16) // 글자를 숫자로 치환한다.
            const binaryByte = decimal.toString(2).padStart(8, "0") // 숫자를 2진수로 바꾼다. // padStart 8자리로 표현하되 비어있다면 0으로 표현한다.
            binary += binaryByte
        }
        return binary
    }

    merkleRoot(data: TransactionData) {
        if (data instanceof TransactionRow) {

        } else {
            // npm install merkle
            // sync는 여러가지 배열의 값을 이용해서 연산
            // root는 한가지로 만들어줌
            return merkle('sha256').sync([data]).root()
        }
    }

    isValidHash(hash: Hash): void {
        const hexRegExp = /^[0-9a-fA-F]{64}$/
        if(!hexRegExp.test(hash) || hash.length !== 64) {
            throw new Error(`해시값(hash : ${hash})이 올바르지 않습니다`)
        }
    }
}

export default CryptoModule