import { IBlock } from '../block.interface';
import { Proof } from './workproof.interface';

class ProofOfWork implements Proof{
    execute(): IBlock {
        return {} as IBlock
    }
}

export default ProofOfWork