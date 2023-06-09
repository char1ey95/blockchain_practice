import { SignatureInput } from 'elliptic'

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

export class UnspentTxOut {
    txOutId!: string
    txOutIndex!: number
    account!: string
    amount!: number
}

export type TransactionData = string | TransactionRow[]

export type UnspentTxOutPool = UnspentTxOut[]
export type TransactionPool = TransactionRow[]