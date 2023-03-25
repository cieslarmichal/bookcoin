import { Block } from '../../entities/block/block.js';
import { Blockchain } from '../../entities/blockchain/blockchain.js';
import { IndexNotMatchingIncrementedIndexFromLastBlockInBlockchainError } from '../../errors/indexNotMatchingIncrementedIndexFromLastBlockInBlockchainError.js';
import { PreviousHashNotMatchingHashFromLastBlockInBlockchainError } from '../../errors/previousHashNotMatchingHashFromLastBlockInBlockchainError.js';
import { BlockService } from '../blockService/blockService.js';

export class BlockchainService {
  public constructor(private readonly blockService: BlockService) {}

  public validateNewBlock(blockchain: Blockchain, newBlock: Block): void {
    const lastBlock = blockchain.getLastBlock();

    if (newBlock.index !== lastBlock.index + 1) {
      throw new IndexNotMatchingIncrementedIndexFromLastBlockInBlockchainError({
        index: newBlock.index,
        lastBlockchainBlockIndex: lastBlock.index,
      });
    }

    if (lastBlock.hash !== newBlock.previousHash) {
      throw new PreviousHashNotMatchingHashFromLastBlockInBlockchainError({
        previousHash: newBlock.previousHash,
        lastBlockchainBlockHash: lastBlock.hash,
      });
    }

    this.blockService.checkIfBlockHashIsValid({ block: newBlock });
  }

  public checkIfBlockchainIsValid(): boolean {}
}
