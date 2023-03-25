import { Block } from '../../entities/block/block.js';
import { BlockService } from '../blockService/blockService.js';

export class BlockchainService {
  public constructor(private readonly blockService: BlockService) {}

  public checkIfBlocksAreValid(blocks: Block[]): boolean {
    if (!blocks.length) {
      return false;
    }

    const firstBlock = blocks[0] as Block;

    if (!this.blockService.checkIfBlockIsGenesisBlock({ block: firstBlock })) {
      return false;
    }

    for (let i = 1; i < blocks.length; i++) {
      if (
        !this.blockService.checkIfNewBlockIsValid({
          newBlock: blocks[i] as Block,
          previousBlock: blocks[i - 1] as Block,
        })
      ) {
        return false;
      }
    }
    return true;
  }
}
