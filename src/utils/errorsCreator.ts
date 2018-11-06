import { ListError } from '../models/ListError';
import { generateId } from './generateId';

export const createErrorFactory = (getId: () => Uuid) =>
  (action: string, message: string, itemId: Uuid): ListError =>
    new ListError({
      itemId,
      errorId: getId(),
      action,
      message,
    });

export const createError = createErrorFactory(generateId);
