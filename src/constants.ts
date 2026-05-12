/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Species } from './types';

export const SPECIES_DATA: Species[] = [
  {
    id: 'dimetrodon',
    name: 'Dimétrodon',
    scientificName: 'Dimetrodon teutonis',
    type: 'carnivore',
    diet: 'Petits et grands vertébrés (Orobates, Seymouria, Tambacarnifex, Eudibamus, Thuringothyris)',
    description: 'Le superprédateur emblématique du Permien, reconnaissable à sa voile dorsale. Il n\'est pas un dinosaure mais un synapside.',
    imageUrl: '/images/dimetrodon.jpg',
    eats: ['orobates', 'seymouria', 'tambacarnifex', 'eudibamus', 'thuringothyris']
  },
  {
    id: 'tambacarnifex',
    name: 'Tambacarnifex',
    scientificName: 'Tambacarnifex unguifalcatus',
    type: 'carnivore',
    diet: 'Petits tétrapodes (Seymouria, Eudibamus, Thuringothyris)',
    description: 'Un prédateur agile apparenté au Dimétrodon, spécialisé dans la chasse de proies plus petites.',
    imageUrl: '/images/tambacarnifex.jpg',
    eats: ['seymouria', 'eudibamus', 'thuringothyris']
  },
  {
    id: 'seymouria',
    name: 'Seymouria',
    scientificName: 'Seymouria sanjuanensis',
    type: 'carnivore',
    diet: 'Insectes géants et petits tétrapodes (Meganeura, Paleodictyoptera, Eudibamus)',
    description: 'Un vertébré primitif présentant un mélange de caractères d\'amphibiens et de reptiles.',
    imageUrl: '/images/seymouria.jpg',
    eats: ['meganeura', 'paleodictyoptera', 'eudibamus']
  },
  {
    id: 'orobates',
    name: 'Orobates',
    scientificName: 'Orobates pabsti',
    type: 'herbivore',
    diet: 'Feuilles et tiges (Glossopteris, Lepidodendron)',
    description: 'Un grand herbivore lent, l\'un des premiers vertébrés à être totalement adapté à la vie sur terre.',
    imageUrl: '/images/orobates.jpg',
    eats: ['glossopteris', 'lepidodendron']
  },
  {
    id: 'meganeura',
    name: 'Méganeura',
    scientificName: 'Meganeura',
    type: 'carnivore',
    diet: 'Insects volants (Paleodictyoptera)',
    description: 'Une libellule géante avec une envergure pouvant atteindre 70 cm. Un redoutable prédateur aérien.',
    imageUrl: '/images/meganeura.jpg',
    eats: ['paleodictyoptera']
  },
  {
    id: 'paleodictyoptera',
    name: 'Paléodictyoptère',
    scientificName: 'Paleodictyoptera permiana',
    type: 'herbivore',
    diet: 'Sève et spores de plantes (Glossopteris, Lepidodendron)',
    description: 'Un insecte primitif doté de pièces buccales perceuses pour se nourrir de plantes.',
    imageUrl: '/images/paleoblatte.jpg',
    eats: ['glossopteris', 'lepidodendron']
  },
  {
    id: 'eudibamus',
    name: 'Eudibamus',
    scientificName: 'Eudibamus cursoris',
    type: 'herbivore',
    diet: 'Plantes et petits invertébrés (Glossopteris, Lepidodendron, Paleodictyoptera)',
    description: 'Un petit pararéptile agile, l\'un des plus anciens vertébrés bipèdes connus.',
    imageUrl: '/images/eudibamus.jpg',
    eats: ['glossopteris', 'lepidodendron', 'paleodictyoptera']
  },
  {
    id: 'thuringothyris',
    name: 'Thuringothyris',
    scientificName: 'Thuringothyris mahlstedi',
    type: 'invertivore',
    diet: 'Invertébrés et petits tétrapodes (Paleodictyoptera, Eudibamus)',
    description: 'Un petit captorhinidé robuste qui se nourrissait principalement d\'insectes au sol.',
    imageUrl: '/images/thuringothyris.jpg',
    eats: ['paleodictyoptera', 'eudibamus']
  },
  {
    id: 'lepidodendron',
    name: 'Lépidodendron',
    scientificName: 'Lepidodendron',
    type: 'producer',
    diet: 'Photosynthèse',
    description: 'Un arbre géant typique de l\'ère primaire, pouvant atteindre 30 mètres de haut.',
    imageUrl: '/images/lepidodendron.jpg',
    eats: []
  },
  {
    id: 'glossopteris',
    name: 'Glossopteris',
    scientificName: 'Glossopteris',
    type: 'producer',
    diet: 'Photosynthèse',
    description: 'Une fougère à graines dont les fossiles ont aidé à prouver la dérive des continents.',
    imageUrl: '/images/glossopteris.jpg',
    eats: []
  }
];
