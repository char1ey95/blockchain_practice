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
    txOutId?:string
    txOutIndex!: number
    signature?: SignatureInput
}

export class TxOut {
    account!: string
    amount!: number
}

export class TransactionRow {
    txIns!: TxIn[]
    txOuts!: TxOut[]
    hash?: string // Transaction에 대한 고유한 식별자
}

export type TransactionData = string | TransactionRow[]