import { SignatureInput } from 'elliptic'

export class Sender{
    publicKey?: string
    account!: string
}

export class Receipt {
    sender!: Sender
    received!: string
    amount!: number
    signature?: SignatureInput
}

export class TxIn {

}

export class TxOut {

}

export class TransactionRow {
    txIns?: TxIn[]
    txOuts!: TxOut[]
    hash?: string
}
export type TransactionData = string | TransactionRow[]