/* eslint-disable @typescript-eslint/naming-convention */
import { type FastifyReply, type FastifyInstance, type FastifyRequest } from 'fastify';

import {
  type AddBlockToBlockchainRequestBody,
  addBlockToBlockchainRequestBodySchema,
} from './schemas/addBlockToBlockchainSchema.js';
import { type AddBlockToBlockchainAction } from '../../actions/addBlockToBlockchainAction/addBlockToBlockchainAction.js';
import { type CreateBlockchainAction } from '../../actions/createBlockchainAction/createBlockchainAction.js';
import { type FindBlocksFromBlockchainAction } from '../../actions/findBlocksFromBlockchainAction/findBlocksFromBlockchainAction.js';
import { HttpStatusCode } from '../../common/http/httpStatusCode.js';
export class HttpController {
  public constructor(
    private readonly createBlockchainAction: CreateBlockchainAction,
    private readonly addBlockToBlockchainAction: AddBlockToBlockchainAction,
    private readonly findBlocksFromBlockchainAction: FindBlocksFromBlockchainAction,
  ) {}

  public registerRoutes(fastify: FastifyInstance): void {
    fastify.register(async (fastifyInstance) => {
      fastifyInstance.post('/api/blockchain', this.createBlockchain.bind(this));

      fastifyInstance.post(
        '/api/blockchain/blocks',
        { schema: { body: addBlockToBlockchainRequestBodySchema } },
        this.addBlockToBlockchain.bind(this),
      );

      fastifyInstance.get('/api/blockchain/blocks', this.findBlocksFromBlockchain.bind(this));

      fastifyInstance.get('/api//peers', (_req, res) => {
        res.send(peerToPeerServer.getPeers());
      });

      fastifyInstance.post('/api//peers', (req, res) => {
        const requestBody = req.body as { peer: string };

        peerToPeerServer.addPeer(requestBody.peer);

        res.send();
      });
    });
  }

  private async createBlockchain(_request: FastifyRequest, reply: FastifyReply): Promise<void> {
    const { blocks } = await this.createBlockchainAction.execute();

    reply.code(HttpStatusCode.created).send({ data: { blocks } });
  }

  private async addBlockToBlockchain(
    request: FastifyRequest<{ Body: AddBlockToBlockchainRequestBody }>,
    reply: FastifyReply,
  ): Promise<void> {
    const { blockData } = request.body;

    const { blocks } = await this.addBlockToBlockchainAction.execute({ blockData });

    reply.code(HttpStatusCode.ok).send({ data: { blocks } });
  }

  private async findBlocksFromBlockchain(_request: FastifyRequest, reply: FastifyReply): Promise<void> {
    const { blocks } = await this.findBlocksFromBlockchainAction.execute();

    reply.code(HttpStatusCode.ok).send({ data: { blocks } });
  }
}
