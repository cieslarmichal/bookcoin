export class AuthorModule implements DependencyInjectionModule {
  public async declareBindings(container: DependencyInjectionContainer): Promise<void> {
    container.bindToConstructor<AuthorMapper>(authorModuleSymbols.authorMapper, AuthorMapperImpl);

    container.bindToConstructor<AuthorRepositoryFactory>(
      authorModuleSymbols.authorRepositoryFactory,
      AuthorRepositoryFactoryImpl,
    );

    container.bindToConstructor<AuthorService>(authorModuleSymbols.authorService, AuthorServiceImpl);

    container.bindToConstructor<AuthorController>(authorModuleSymbols.authorController, AuthorController);
  }
}
