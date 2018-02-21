// class Blockchain(object):
//     def __init__(self):
//         self.chain = []
//         self.current_transactions = []

//     def new_block(self):
//         # Creates a new Block and adds it to the chain
//         pass

//     def new_transaction(self):
//         # Adds a new transaction to the list of transactions
//         pass

//     @staticmethod
//     def hash(block):
//         # Hashes a Block
//         pass

//     @property
//     def last_block(self):
//         # Returns the last Block in the chain
//         pass

export class Blockchain {
    private chain: Array<any>; //TODO type this chain
    private currentTransactions: Array<any>; //TODO type this array

    constructor() {
        this.chain = [];
        this.currentTransactions = []
    }

    public createNewBlock(): any {
        //Create a new block and add it to the chain
        return;
    }

    public createNewTransaction(): any {
        //adds a new transaction to the list of transactions
        return;
    }

    public hash(): any {
        //Hashes a block
        return;
    }

    public getLastBlock(): any {
        //returnsthe last Block in the chain
        return;
    }
}