import { Component, computed, signal } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { GameCard } from '../game/game-card.component';
import { Game } from '../game/game.model';
import { GameSection } from '../layouts/game-section/game-section';
import { FlixButton } from '../ui/button/flix-button';

// @Component relie la classe TypeScript a la vue HTML associee.
// Angular instancie ce composant racine pour piloter l'etat et le rendu de l'ecran principal.
// Dans WishFlix, App orchestre le hero, le filtre et la grille de jeux dans un seul point d'entree.
// Pour aller plus loin: https://angular.dev/essentials/components
@Component({
  selector: 'app-root',
  // En standalone, imports declare explicitement les composants utilises par le template.
  // Cette liste rend les dependances visibles et evite les imports magiques de module global.
  // Dans WishFlix, on comprend vite quelles briques composent la home (GameCard, GameSection, FlixButton).
  // Pour aller plus loin: https://angular.dev/guide/components/importing
  imports: [NgOptimizedImage, GameCard, GameSection, FlixButton],
  templateUrl: './app.template.html',
})
export class App {
  protected readonly nomApplication = 'WishFlix';
  // signal<boolean>: stocke l'etat local du filtre "disponibles uniquement".
  // Quand sa valeur change, Angular notifie automatiquement les lectures reactives du template.
  // Dans WishFlix, ce booleen permet d'alterner instantanement entre tout le catalogue et les jeux disponibles.
  // Pour aller plus loin: https://angular.dev/guide/signals
  protected readonly onlyAvailable = signal<boolean>(false);
  // signal<Game[]>: source de verite locale du catalogue affiche.
  // Ce modele centralise les donnees et evite de dupliquer la meme liste dans plusieurs variables.
  // Dans WishFlix, on garde une base unique pour le filtrage, les stats et la wishlist.
  // Pour aller plus loin: https://angular.dev/guide/signals
  protected readonly games = signal<Game[]>([
    {
      id: 1,
      title: 'Cyber Nexus 2077',
      genre: 'RPG',
      category: 'Nouveautes',
      year: 2023,
      platform: 'PC, PS5, Xbox',
      rating: 4.5,
      synopsis: 'Un RPG futuriste dans un monde cyberpunk.',
      available: true,
      image: 'https://via.assets.so/game.png?id=1&q=95&w=300&h=450&fit=cover',
    },
    {
      id: 2,
      title: 'Stellar Odyssey',
      genre: 'Aventure',
      category: 'Nouveautes',
      year: 2023,
      platform: 'PC, PS5',
      rating: 4.8,
      synopsis: 'Une aventure spatiale epique.',
      available: true,
      image: 'https://via.assets.so/game.png?id=2&q=95&w=300&h=450&fit=cover',
    },
    {
      id: 3,
      title: 'Shadow Legends',
      genre: 'Action',
      category: 'Populaires',
      year: 2022,
      platform: 'PC, Xbox',
      rating: 4.2,
      synopsis: 'Combattez les forces des tenebres.',
      image: 'https://via.assets.so/game.png?id=3&q=95&w=300&h=450&fit=cover',
      available: false,
    },
    {
      id: 4,
      title: 'Racing Thunder',
      genre: 'Course',
      category: 'Populaires',
      year: 2022,
      platform: 'PS5, Xbox',
      rating: 4.0,
      synopsis: 'Des courses a couper le souffle.',
      available: true,
      image: 'https://via.assets.so/game.png?id=4&q=95&w=300&h=450&fit=cover',
    },
    {
      id: 5,
      title: 'Fantasy Kingdom',
      genre: 'RPG',
      category: 'Classiques',
      year: 2020,
      platform: 'PC',
      rating: 4.7,
      synopsis: 'Un monde fantastique vous attend.',
      available: true,
      image: 'https://via.assets.so/game.png?id=5&q=95&w=300&h=450&fit=cover',
    },
    {
      id: 6,
      title: 'Zombie Survival',
      genre: 'Horreur',
      category: 'Classiques',
      year: 2021,
      platform: 'PC, PS5, Xbox',
      rating: 3.9,
      synopsis: 'Survivez a l apocalypse zombie.',
      image: 'https://via.assets.so/game.png?id=6&q=95&w=300&h=450&fit=cover',
      available: false,
    },
  ]);

  // signal<number[]>: stocke uniquement les ids favoris, pas des objets Game complets.
  // Ce choix reduit la duplication memoire et simplifie les operations d'ajout/suppression.
  // Dans WishFlix, la wishlist reste synchronisee avec le catalogue sans copie de donnees.
  // Pour aller plus loin: https://angular.dev/guide/signals
  protected favoriteGameIds = signal<number[]>([]);

  // computed(): derive la liste visible depuis games() et onlyAvailable().
  // Angular met en cache le resultat et ne recalcule que si une dependance reactive change.
  // Dans WishFlix, ce pattern garde le filtre lisible et performant meme quand la grille grandit.
  // Pour aller plus loin: https://angular.dev/guide/signals
  protected readonly visibleGames = computed(() => {
    if (!this.onlyAvailable()) return this.games();
    return this.games().filter((game) => game.available);
  });

  protected filterByAvailibility(): void {
    // update() produit une nouvelle valeur a partir de l'ancienne, sans mutation manuelle.
    // Cette ecriture immutable declenche proprement le recalcul des computed dependants.
    // Dans WishFlix, un clic sur le bouton suffit pour rafraichir toutes les cartes affichees.
    // Pour aller plus loin: https://angular.dev/guide/signals
    this.onlyAvailable.update((available) => !available);
  }

  // update() sur un tableau permet d'ajouter ou retirer un favori de facon pure et previsible.
  // La source de verite reste dans App, ce qui facilite les tests et les evolutions futures.
  // Dans WishFlix, chaque carte emet une intention et le parent maintient l'etat global coherent.
  // Pour aller plus loin: https://angular.dev/guide/signals
  protected toggleFavorite(gameId: number): void {
    this.favoriteGameIds.update((gameIds) => {
      const isGameAlreadyFavorite = gameIds.includes(gameId);
      if (!isGameAlreadyFavorite) return [...gameIds, gameId];
      return gameIds.filter((oldGameId) => oldGameId !== gameId);
    });
  }

  // Methode de lecture: traduit l'etat global favoriteGameIds en booleen pour la carte courante.
  // Garder ce calcul dans la classe evite des expressions longues et peu lisibles dans le template.
  // Dans WishFlix, l'etat visuel du bouton wishlist reste aligne avec la source de verite.
  // Pour aller plus loin: https://angular.dev/guide/templates/expression-syntax
  protected isFavorite(gameId: number): boolean {
    return this.favoriteGameIds().includes(gameId);
  }

  // computed de presentation: derive le libelle du bouton depuis onlyAvailable().
  // Le template reste simple car il lit une valeur prete a afficher, sans logique conditionnelle inline.
  // Dans WishFlix, le CTA reflete toujours l'action suivante attendue par l'utilisateur.
  // Pour aller plus loin: https://angular.dev/guide/signals
  protected filterAvailibilityLabel = computed((): string => {
    return this.onlyAvailable() ? 'Voir tous les jeux' : 'Voir les jeux disponibles';
  });
}
