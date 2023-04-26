import { Hash } from 'types/block'
import cryptojs from 'crypto-js'
import merkle from "merkle"
import { TransactionData, TransactionRow } from '@core/transaction/transaction.interface'
import { BlockInfo } from '@core/block/block.interface'

class CryptoModule {

    createBlockHash(data: BlockInfo): string {
        const value = Object.values(data).sort().join('')
        return this.SHA256(value)
    }

    SHA256(data: string): Hash {
        const hash: Hash = cryptojs.SHA256(data).toString()
        return hash as Hash
    }

    hexToBinary(hash: Hash): string {
        let binary = ''
        for (let i = 0; i < hash.length; i += 2) {
            const hexByte = hash.substr(i, 2)
            const decimal = parseInt(hexByte, 16)
            const binaryByte = decimal.toString(2).padStart(8, "0")
            binary += binaryByte
        }
        return binary
    }

    merkleRoot(data: TransactionData) {
        if (data instanceof TransactionRow) {

        } else {
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