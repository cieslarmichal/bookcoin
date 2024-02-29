import { ResourceNotFoundError } from '../../common/errors/resourceNotFoundError.js';
import { type LoggerService } from '../../common/logger/services/loggerService/loggerService.js';
import { type Block } from '../../domain/entities/block/block.js';
import { type BlockchainRepository } from '../../domain/repositories/blockchainRepository/blockchainRepository.js';
import { type GenesisBlockService } from '../../domain/services/genesisBlockService/genesisBlockService.js';

export interface AddBlockToBlockchainActionPayload {
  readonly blockData: string;
}

export interface AddBlockToBlockchainActionResult {
  readonly blocks: Block[];
}

export class AddBlockToBlockchainAction {
  public constructor(
    private readonly blockRepository: BlockchainRepository,
    private readonly genesisBlockService: GenesisBlockService,
    private readonly loggerService: LoggerService,
  ) {}

  public async execute(payload: AddBlockToBlockchainActionPayload): Promise<AddBlockToBlockchainActionResult> {
    const { blockData } = payload;

    const blockchain = await this.blockRepository.findBlockchain();

    if (!blockchain) {
      throw new ResourceNotFoundError({
        name: 'Blockchain',
      });
    }

    this.loggerService.debug({
      message: 'Adding block to the blockchain...',
      blockData,
    });

    blockchain.addBlock(this.genesisBlockService, blockData);

    await this.blockRepository.saveBlockchain({ blockchain });

    const blocks = blockchain.getBlocks();

    this.loggerService.debug({
      message: 'Block added to the blockchain.',
      blockIndex: (blocks.at(-1) as Block).index,
    });

    return { blocks };
  }
}
