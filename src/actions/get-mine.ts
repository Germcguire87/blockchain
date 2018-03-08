import * as Promise from 'bluebird';
import { Blockchain } from '../blockchain';

export function getMineRouteHandler(req: Request, res: Response, blockchain: Blockchain, nodeIdentifier: string): void {
    // # We run the proof of work algorithm to get the next proof...
    let lastBlock = blockchain.getLastBlock();
    let lastProofOfWork = lastBlock.proofOfWork;
    let proofOfWork = blockchain.proofOfWork(lastProofOfWork);

    // # We must receive a reward for finding the proof.
    // # The sender is "0" to signify that this node has mined a new coin
    blockchain.createNewTransaction('0', nodeIdentifier, 1);

    // # Forge the new Block by adding it to the chain
    let previousHash = blockchain.hash(lastBlock);
    let block = blockchain.createNewBlock(proofOfWork, previousHash);

    let reponse = {
        message: 'New Block Forged',
        index: block.index,
        transactions: block.transactions,
        proof: block.proofOfWork,
        previous_hash: block.proofOfWork
    };

    // TODO Return the respone and 200
}
