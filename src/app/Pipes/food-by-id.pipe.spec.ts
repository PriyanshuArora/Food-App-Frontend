import { FoodByIdPipe } from './food-by-id.pipe';

describe('FoodByIdPipe', () => {
  it('create an instance', () => {
    const pipe = new FoodByIdPipe();
    expect(pipe).toBeTruthy();
  });
});
