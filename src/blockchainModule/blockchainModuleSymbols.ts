export const blockchainModuleSymbols = {
  genesisBlockService: Symbol('genesisBlockService'),
  blockchainRepository: Symbol('blockchainRepository'),
  createBlockchainCommandHandler: Symbol('createBlockchainCommandHandler'),
  addBlockToBlockchainCommandHandler: Symbol('addBlockToBlockchainCommandHandler'),
  findBlocksFromBlockchainQueryHandler: Symbol('findBlocksFromBlockchainQueryHandler'),
  blockAddedToBlockchainSubscriber: Symbol('blockAddedToBlockchainSubscriber'),
  blockchainHttpController: Symbol('blockchainHttpController'),
  webSocketController: Symbol('webSocketController'),
};
