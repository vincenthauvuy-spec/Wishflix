import { Component, input } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { Game } from './game.model';
import { FlixButton } from '../ui/button/flix-button';

// @Component relie la classe TypeScript au template de la carte.
// Le composant devient reutilisable partout dans la grille de jeux.
// Pour aller plus loin: https://angular.dev/essentials/components
@Component({
  // NgOptimizedImage est importe ici pour activer ngSrc dans le template.
  // Pour aller plus loin: https://angular.dev/guide/image-optimization
  imports: [NgOptimizedImage, FlixButton],
  selector: 'game-card',
  templateUrl: './game-card.template.html',
})
export class GameCard {
  // input.required impose au parent de fournir un Game valide a chaque carte.
  // Ce contrat rend les erreurs de binding visibles a la compilation.
  // Pour aller plus loin: https://angular.dev/guide/components/inputs
  game = input.required<Game>();
}
