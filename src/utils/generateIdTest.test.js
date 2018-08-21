import { generateId } from './generateId';

describe('Id generation', () => {
  const uuidv4Format = /^[0-9A-F]{8}-[0-9A-F]{4}-[4][0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i;

  it('generates different ids', () => {
    const firstId = generateId();
    const secondId = generateId();

    expect(firstId).not.toBe(secondId);
  });

  it('generates id in correct format', () => {
    const id = generateId();

    expect(id).toMatch(uuidv4Format);
  });
});
