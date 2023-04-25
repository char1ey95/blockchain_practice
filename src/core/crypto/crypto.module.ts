import { Hash } from 'types/block'
import cryptojs from 'crypto-js'

class CryptoModule {
    SHA256(data: string): Hash {
        const hash: Hash = cryptojs.SHA256(data).toString()
        return hash as Hash
    }
}

export default CryptoModule