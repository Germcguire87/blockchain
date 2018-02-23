import {
    IBlock,
    ITransaction
} from './models'
import * as _ from 'lodash';
import * as crypto from 'crypto';

export class Blockchain {
    private chain: Array<IBlock>;
    private currentTransactions: Array<ITransaction>;

    constructor() {
        this.chain = [];
        this.currentTransactions = []
        this.createNewBlock(100, '1');
    }

    public createNewBlock(proofOfWork: number, previousHash?: string): IBlock {
        //Create a new block and add it to the chain
        let hash: string;

        if (previousHash) {
            hash = previousHash;
        } else {
            let lastBlock = _.last(this.chain)
            if (!lastBlock) {
                throw new Error('createNewBlock - last block was undefined');
            }
            hash = this.hash(lastBlock);
        }
        let block: IBlock = {
            index: this.chain.length + 1,
            timestamp: Date.now(),
            transactions: this.currentTransactions,
            proofOfWork: proofOfWork,
            previousHash: hash
        }

        //reset the current transactions
        this.currentTransactions = [];

        //Adds the newly created block to the chain
        this.chain.push(block);

        return block
    }

    public createNewTransaction(): any {
        //adds a new transaction to the list of transactions
        return;
    }

    public hash(block: IBlock): string {
        //Creates a SHA-256 hash of a Block
        let stringifiedBlock = JSON.stringify(block);//TODO abstract this hashing work out
        const hash = crypto.createHash('sha256') //TODO create CONSTANTS for these string
        hash.update(stringifiedBlock);

        return hash.digest('hex') //TODO add to constant
    }

    public getLastBlock(): any {
        //returns the last Block in the chain
        return;
    }

    public newTransaction(sender: number, recipient: number, amount: number): number {
        //Creates a new transaction to go into the next mined Block

        this.currentTransactions.push({
            sender: sender,
            recipient: recipient,
            amount: amount
        })

        //The index of the Block that will hold this transaction
        return this.getLastBlock() + 1
    }

    public proofOfWork(lastProof: number): number {
        //Simple Proof of Work Algorithm:
        //      - Find a number proof such that hash(previousProof, newProof) contains leading 4 zeroes, where p is the previous p'
        //      - p is the previous proof, and p' is the new proof

        let proof = 0;
        while (this.isProofValid(lastProof, proof) === false) {
            proof += 1;
        }
        return proof;
    }

    public isProofValid(lastProof: number, currentProof: number): boolean {
        // Validates the Proof: Does hash(last_proof, proof) contain 4 leading zeroes?

        let guess: string = `${lastProof}${currentProof}`;
        const hash = crypto.createHash('sha256') //TODO create CONSTANTS for these string
        let guessHash = hash.update(guess).digest('hex');

        return guessHash.substr(guessHash.length - 4) === '0000'; //TODO ADD TO CONSTANTS
    }
}