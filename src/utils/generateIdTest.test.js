import validate from 'uuid-validate';
import { generateId } from './generateId';

describe('Id generation', () => {
  it('checks if 2 ids differs', () => {
    const firstId = generateId();
    const secondId = generateId();

    expect(firstId).not.toBe(secondId);
  });

  it('checks correct format', () => {
    const id = generateId();

    const result = validate(id, 4);

    expect(result).toBeTruthy();
  });
});
