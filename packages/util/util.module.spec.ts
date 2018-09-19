import { ZJMYUtilModule } from './util.module';

describe('UtilModule', () => {
  let zjmyUtilModule: ZJMYUtilModule;

  beforeEach(() => {
    zjmyUtilModule = new ZJMYUtilModule();
  });

  it('should create an instance', () => {
    expect(zjmyUtilModule).toBeTruthy();
  });
});
