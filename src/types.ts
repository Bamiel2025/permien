/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type SpeciesType = 'producer' | 'herbivore' | 'carnivore' | 'invertivore';

export interface Species {
  id: string;
  name: string;
  scientificName: string;
  type: SpeciesType;
  diet: string;
  description: string;
  imageUrl: string;
  eats: string[]; // ids of species this one eats
}

export interface Link {
  consumerId: string;
  producerId: string; // The thing being eaten
}

export interface NodePosition {
  x: number;
  y: number;
}
