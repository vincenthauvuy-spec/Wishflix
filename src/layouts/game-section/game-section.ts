import { Component, input } from '@angular/core';
import { FlixButton } from '../../ui/button/flix-button';

// Composant layout: centralise la structure commune d'une section de catalogue.
// On evite de dupliquer le meme HTML dans plusieurs ecrans ou futures pages.
// Dans WishFlix, ce conteneur permet d'ajouter de nouvelles rangees sans copier-coller.
// Pour aller plus loin: https://angular.dev/essentials/components
@Component({
  selector: 'game-section',
  imports: [FlixButton],
  templateUrl: './game-section.html',
  styleUrl: './game-section.css',
})
export class GameSection {
  // input.required impose un titre obligatoire pour garantir un en-tete toujours present.
  // Angular signale l'oubli au build au lieu de laisser un rendu incomplet en runtime.
  // Dans WishFlix, chaque section garde un repere clair pour l'utilisateur et l'accessibilite.
  // Pour aller plus loin: https://angular.dev/guide/components/inputs
  title = input.required<string>();

  // Input optionnel: le parent peut fournir un sous-titre selon le contexte d'affichage.
  // Le composant reste flexible sans multiplier les variantes de section.
  // Dans WishFlix, on peut enrichir certaines rangees sans alourdir les plus simples.
  // Pour aller plus loin: https://angular.dev/guide/components/inputs
  subtitle = input<string>();
}
