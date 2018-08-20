import { generateId } from './generateId';

describe('Id generation', () => {
  it('checks if 2 ids differs', () => {
    const firstId = generateId();
    const secondId = generateId();

    expect(firstId).not.toBe(secondId);
  });

  it('checks correct format', () => {
    const id = generateId();

    const correctFormat = /^[0-9A-F]{8}-[0-9A-F]{4}-[4][0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i;
    const result = correctFormat.test(id);
    expect(result).toBeTruthy();
  });
});
