import { Component, input, output } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { Game } from './game.model';
import { FlixButton } from '../ui/button/flix-button';

// @Component relie la classe TypeScript au template de la carte.
// Angular cree une instance par jeu affiche et applique les bindings definis dans le HTML associe.
// Dans WishFlix, cette isolation facilite la reutilisation du meme bloc sur plusieurs sections.
// Pour aller plus loin: https://angular.dev/essentials/components
@Component({
  // NgOptimizedImage active les optimisations de chargement quand on utilise ngSrc.
  // Angular peut mieux gerer priorite, dimensions et stabilite visuelle pendant le rendu.
  // Dans WishFlix, les affiches restent fluides et limitent les sauts de layout dans la grille.
  // Pour aller plus loin: https://angular.dev/guide/image-optimization
  imports: [NgOptimizedImage, FlixButton],
  selector: 'game-card',
  templateUrl: './game-card.template.html',
})
export class GameCard {
  // input.required impose au parent de fournir un Game valide a chaque carte.
  // Ce contrat detecte les oublis de donnees avant execution et evite les affichages incomplets.
  // Dans WishFlix, chaque carte recoit toujours les infos minimales (titre, image, note, etc.).
  // Pour aller plus loin: https://angular.dev/guide/components/inputs
  game = input.required<Game>();

  // output() emet un evenement enfant -> parent sans modifier directement l'etat global.
  // Le parent decide ensuite comment mettre a jour la wishlist selon l'id recu.
  // Dans WishFlix, ce flux garde une source de verite unique dans App.
  // Pour aller plus loin: https://angular.dev/guide/components/outputs
  favorite = output<number>();

  // Input optionnel: le parent indique si la carte est deja dans les favoris.
  // Cette lecture descendante separe l'affichage local de la logique metier globale.
  // Dans WishFlix, le bouton adapte son texte sans dupliquer la logique de selection.
  // Pour aller plus loin: https://angular.dev/guide/components/inputs
  isFavorite = input<boolean>(false);

  // Getter JavaScript: calcule un libelle a la lecture sans appel explicite dans le template.
  // Cette approche garde le HTML declaratif et centralise la regle de presentation dans la classe.
  // Dans WishFlix, le texte du bouton reste coherent sur toutes les cartes de jeux.
  // Pour aller plus loin: https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Functions/get
  get wishlistLabel(): string {
    const verb = this.isFavorite() ? 'Retirer de' : 'Ajouter à';
    return `${verb} la wishlist`;
  }
}
