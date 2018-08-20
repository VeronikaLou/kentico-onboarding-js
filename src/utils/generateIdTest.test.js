import validate from 'uuid-validate';
import { generateId } from './generateId';

describe('Id generation', () => {
  it('check if 2 ids differs', () => {
    const firstId = generateId();
    const secondId = generateId();

    expect(firstId).not.toBe(secondId);
  });

  it('check correct format', () => {
    const id = generateId();

    const result = validate(id, 4);

    expect(result).toBeTruthy();
  });
});
