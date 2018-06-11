import { BotoesModule } from './botoes.module';

describe('BotoesModule', () => {
  let botoesModule: BotoesModule;

  beforeEach(() => {
    botoesModule = new BotoesModule();
  });

  it('should create an instance', () => {
    expect(botoesModule).toBeTruthy();
  });
});
