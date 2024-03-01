import { Block } from '../../entities/block/block.js';

export interface GenesisBlockServiceConfig {
  readonly genesisBlock: {
    readonly index: number;
    readonly hash: string;
    readonly previousHash: string;
    readonly timestamp: number;
    readonly data: string;
  };
}

export interface CheckIfBlockIsGenesisBlockPayload {
  readonly index: number;
  readonly hash: string;
  readonly previousHash: string;
  readonly timestamp: number;
  readonly data: string;
}

export class GenesisBlockService {
  public constructor(private readonly config: GenesisBlockServiceConfig) {}

  public createGenesisBlock(): Block {
    return Block.createBlock({
      genesisBlockService: this,
      ...this.config.genesisBlock,
    });
  }

  public checkIfBlockIsGenesisBlock(payload: CheckIfBlockIsGenesisBlockPayload): boolean {
    const { index, hash, previousHash, timestamp, data } = payload;

    return (
      index === this.config.genesisBlock.index &&
      hash === this.config.genesisBlock.hash &&
      previousHash === this.config.genesisBlock.previousHash &&
      timestamp === this.config.genesisBlock.timestamp &&
      data === this.config.genesisBlock.data
    );
  }
}
