export const blockchainModuleSymbols = {
  genesisBlockService: Symbol('genesisBlockService'),
  blockchainRepository: Symbol('blockchainRepository'),
  addBlockToBlockchainCommandHandler: Symbol('addBlockToBlockchainCommandHandler'),
  findBlocksFromBlockchainQueryHandler: Symbol('findBlocksFromBlockchainQueryHandler'),
  blockAddedToBlockchainSubscriber: Symbol('blockAddedToBlockchainSubscriber'),
  blockchainHttpController: Symbol('blockchainHttpController'),
};
