import {
  validateDeleteResponse,
  validateGetResponse,
  validatePostResponse,
  validatePutResponse
} from './responseValidator';
import 'isomorphic-fetch';
import { IFetchedItem } from '../models/IFetchedItem';

describe('Validate get response', () => {
  it('should return json if status code is 200 and ok is true', () => {
    const response = new Response(
      '[]',
      {
        'status': 200,
        'statusText': 'OK'
      });
    const expectedResult: IFetchedItem[] = [];

    return validateGetResponse(response).then(result =>
      expect(result).toEqual(expectedResult));
  });

  it('should throw error if status code is not 200', async () => {
    const response = new Response(
      '[]',
      {
        'status': 504,
        'statusText': 'OK'
      });

    return validateGetResponse(response)
      .catch(error => expect(error).toBeTruthy());
  });
});

describe('Validate put post response', () => {
  const postResponse = new Response(
    '{}',
    {
      'status': 201,
    });

  const putResponse = new Response(
    '{}',
    {
      'status': 200,
    });

  const invalidResponse = new Response(
    '{}',
    {
      'status': 504,
    });

  const validResponses = [validatePostResponse(postResponse), validatePutResponse(putResponse)];
  const invalidResponses = [validatePostResponse(invalidResponse), validatePutResponse(invalidResponse)];

  validResponses.forEach(response => {
    it('should return json if status code is as expected and ok is true', () => {
      const expectedResult = {};

      return response.then(result =>
        expect(result).toEqual(expectedResult));
    });
  });

  invalidResponses.forEach(response => {
    it('should throw error if status code is not as expected', () => {
      return response.catch(
        error => expect(error).toBeTruthy()
      );
    });
  });
});

describe('Validate delete response', () => {
  const invalidResponse = new Response(
    '{}',
    {
      'status': 404,
    });

  const deleteResponse = new Response(
    '{}',
    {
      'status': 204,
    });

  it('should throw exceptions if status code is not 204', () => {
      expect(() => validateDeleteResponse(invalidResponse)).toThrow('Invalid response');
    }
  );
});
