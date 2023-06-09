import Block from '@core/block/block';
import ProofOfWork from '@core/block/workproof/proofofwork';
import WorkProof from '@core/block/workproof/workproof';
import Chain from '@core/chain/chain';
import CryptoModule from '@core/crypto/crypto.module';
import Ingchain from '@core/ingchain';
import Transaction from '@core/transaction/transaction';
import Unspent from '@core/transaction/unspent';
import DigitalSignature from '@core/wallet/digitalSignature';
import Wallet from '@core/wallet/wallet';

const chain = new Chain()
const crypto = new CryptoModule()
const proof = new ProofOfWork(crypto)
const workproof = new WorkProof(proof)
const transaction = new Transaction(crypto)

const block = new Block(crypto, workproof)
const unspent = new Unspent()
const web7722 = new Ingchain(chain, block, transaction,  unspent)

const digitalSignature = new DigitalSignature(crypto)
const accounts = new Wallet(digitalSignature)

const sender = accounts.create()

const block01 = web7722.mineBlock(sender.account)
web7722.mineBlock(sender.account)
web7722.mineBlock(sender.account)
console.log(block01)

const balance = web7722.getBalance(sender.account)

console.log(balance)