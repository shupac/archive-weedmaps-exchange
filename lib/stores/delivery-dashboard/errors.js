/* eslint-disable import/prefer-default-export */
// @flow
// @ToDo: Remove the eslint-disabled when there are two or more errors defined here

export class MissingResource extends Error {
  constructor(resource: string, id: string) {
    super(`Unable to find ${resource} with id of "${id}"`);
  }
}
