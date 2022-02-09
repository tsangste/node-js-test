import { CalculateService } from './calculate.service';

describe('CalculateService', () => {
  let service: CalculateService;
  const sizes = [250, 500, 1000, 2000, 5000];

  beforeEach(() => {
    service = new CalculateService();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('items ordered 1', async () => {
    const result = await service.getSize(sizes, 1);

    expect(result).toEqual([250]);
  });
});
