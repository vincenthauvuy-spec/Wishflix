// Type metier: contrat unique des donnees Game partage entre App et GameCard.
// Ce modele evite les incoherences de proprietes entre composants.
// Pour aller plus loin: https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#type-aliases
export type Game = {
  id: number;
  title: string;
  genre: string;
  category: string;
  year: number;
  platform: string;
  rating: number;
  synopsis: string;
  available: boolean;
  image: string;
};
