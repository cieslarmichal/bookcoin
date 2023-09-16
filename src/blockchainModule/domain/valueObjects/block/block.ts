import crypto from 'crypto-js';

import { InvalidBlockHashError } from '../../errors/invalidBlockHashError.js';
import { InvalidGenesisBlockError } from '../../errors/invalidGenesisBlockError.js';
import { InvalidIndexFormatError } from '../../errors/invalidIndexFormatError.js';
import { PreviousHashNotProvidedError } from '../../errors/previousHashNotProvidedError.js';
import { GenesisBlockService } from '../../services/genesisBlockService/genesisBlockService.js';

export interface CreateBlockPayload {
  readonly genesisBlockService: GenesisBlockService;
  readonly index: number;
  readonly hash?: string | undefined;
  readonly previousHash: string;
  readonly timestamp?: number | undefined;
  readonly data: string;
}

export interface BlockDraft {
  readonly index: number;
  readonly hash: string;
  readonly previousHash: string;
  readonly timestamp: number;
  readonly data: string;
}

export class Block {
  public readonly index: number;
  public readonly hash: string;
  public readonly previousHash: string;
  public readonly timestamp: number;
  public readonly data: string;

  private constructor(draft: BlockDraft) {
    const { index, hash, previousHash, timestamp, data } = draft;

    this.index = index;
    this.hash = hash;
    this.previousHash = previousHash;
    this.timestamp = timestamp;
    this.data = data;
  }

  public static createBlock(payload: CreateBlockPayload): Block {
    const { genesisBlockService, index, hash, previousHash, timestamp, data } = payload;

    if (index === 0) {
      const blockIsGenesisBlock = genesisBlockService.checkIfBlockIsGenesisBlock({
        index,
        hash: hash as string,
        previousHash,
        timestamp: timestamp as number,
        data,
      });

      if (!blockIsGenesisBlock) {
        throw new InvalidGenesisBlockError({
          index,
          hash: hash as string,
          previousHash,
          timestamp: timestamp as number,
          data,
        });
      }

      return new Block({
        index,
        hash: hash as string,
        previousHash,
        timestamp: timestamp as number,
        data,
      });
    }

    if (!Number.isInteger(index) || index < 0) {
      throw new InvalidIndexFormatError({ index });
    }

    if (!previousHash) {
      throw new PreviousHashNotProvidedError();
    }

    const actualTimestamp = timestamp ?? new Date().getTime() / 1000;

    const validHash = crypto.SHA256(String(index) + previousHash + String(timestamp) + data).toString();

    if (hash && hash !== validHash) {
      throw new InvalidBlockHashError({ hash, validHash });
    }

    return new Block({ index, hash: validHash, previousHash, timestamp: actualTimestamp, data });
  }
}
