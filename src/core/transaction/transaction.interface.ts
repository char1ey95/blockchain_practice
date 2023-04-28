import { SignatureInput } from 'elliptic'

export class Sender{
    publicKey?: string
    account!: string
}

export class Receipt {
    sender!: Sender
    received!: string
    amount!: string
    signature?: SignatureInput
}

export class TransactionRow {
    hash?: string
}
export type TransactionData = string | TransactionRow[]