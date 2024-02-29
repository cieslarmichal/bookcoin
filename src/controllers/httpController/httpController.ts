/* eslint-disable @typescript-eslint/naming-convention */
import { type FastifyReply, type FastifyInstance, type FastifyRequest } from 'fastify';
import { request } from 'http';

import {
  type AddBlockToBlockchainRequestBody,
  addBlockToBlockchainRequestBodySchema,
} from './schemas/addBlockToBlockchainSchema.js';
import { type FindBlocksFromBlockchainResponseOkBody } from './schemas/findBlocksFromBlockchainSchema.js';
import { HttpStatusCode } from '../../common/http/httpStatusCode.js';
export class HttpController {
  public readonly basePath = '/api/blockchain';

  public constructor(
    private readonly createBlockchainCommandHandler: CreateBlockchainCommandHandler,
    private readonly addBlockToBlockchainCommandHandler: AddBlockToBlockchainCommandHandler,
    private readonly findBlocksFromBlockchainQueryHandler: FindBlocksFromBlockchainQueryHandler,
  ) {}

  public registerRoutes(fastify: FastifyInstance): void {
    fastify.register(async (fastifyInstance) => {
      fastifyInstance.post(`${this.basePath}/`, this.createBlockchain.bind(this));

      fastifyInstance.post(
        `${this.basePath}/blocks`,
        { schema: { body: addBlockToBlockchainRequestBodySchema } },
        this.addBlockToBlockchain.bind(this),
      );

      fastifyInstance.get(`${this.basePath}/blocks`, this.findBlocksFromBlockchain.bind(this));
    });
  }

  private async createBlockchain(_request: FastifyRequest, reply: FastifyReply): Promise<void> {
    const { blocks } = await this.createBlockchainCommandHandler.execute();

    reply.code(HttpStatusCode.created).send({ data: { blocks } });
  }

  private async addBlockToBlockchain(
    request: FastifyRequest<AddBlockToBlockchainRequestBody>,
    reply: FastifyReply,
  ): Promise<void> {
    const { blockData } = request.body;

    const { blocks } = await this.addBlockToBlockchainCommandHandler.execute({ blockData });

    reply.code(HttpStatusCode.ok).send({ data: { blocks } });
  }

  private async findBlocksFromBlockchain(_request: FastifyRequest, reply: FastifyReply): Promise<void> {
    const { blocks } = await this.findBlocksFromBlockchainQueryHandler.execute();

    reply.code(HttpStatusCode.ok).send({ data: { blocks } });
  }
}
