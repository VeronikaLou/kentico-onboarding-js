import { generateId } from './generateId';

describe('Id generation', () => {
  const correctFormat = /^[0-9A-F]{8}-[0-9A-F]{4}-[4][0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i;

  it('checks if 2 ids differs', () => {
    const firstId = generateId();
    const secondId = generateId();

    expect(firstId).not.toBe(secondId);
  });

  it('checks correct format', () => {
    const id = generateId();

    expect(id).toMatch(correctFormat);
  });
});
