import {
  CheckIfBlockIsGenesisBlockPayload,
  checkIfBlockIsGenesisBlockPayloadSchema,
} from './payloads/checkIfBlockIsGenesisBlockPayload.js';
import { Injectable } from '../../../../libs/dependencyInjection/decorators.js';
import { Validator } from '../../../../libs/validator/validator.js';
import { Block } from '../../entities/block/block.js';

@Injectable()
export class GenesisBlockService {
  private readonly genesisBlockData = {
    index: 0,
    hash: '816534932c2b7154836da6afc367695e6337db8a921823784c14378abed4f7d7',
    previousHash: '0000000000000000000000000000000000000000000000000000000000000000',
    timestamp: 1465154705,
    data: 'Genesis block',
  };

  public createGenesisBlock(): Block {
    return Block.createBlock({ genesisBlockService: this, ...this.genesisBlockData });
  }

  public checkIfBlockIsGenesisBlock(input: CheckIfBlockIsGenesisBlockPayload): boolean {
    const { index, hash, previousHash, timestamp, data } = Validator.validate(
      checkIfBlockIsGenesisBlockPayloadSchema,
      input,
    );

    return (
      index === this.genesisBlockData.index &&
      hash === this.genesisBlockData.hash &&
      previousHash === this.genesisBlockData.previousHash &&
      timestamp === this.genesisBlockData.timestamp &&
      data === this.genesisBlockData.data
    );
  }
}
