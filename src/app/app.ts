import { Component, computed, signal } from '@angular/core';
import { GameCard } from '../game/game-card.component';
import { Game } from '../game/game.model';
import { NgOptimizedImage } from '@angular/common';

// @Component relie la classe TypeScript au template HTML/CSS de l'interface.
// C'est le point d'entree pour declarer la vue et les imports utilises par ce composant.
// Pour aller plus loin: https://angular.dev/essentials/components
@Component({
  selector: 'app-root',
  // On importe explicitement les composants utilises dans le template.
  // Cela rend les dependances visibles et limite les imports implicites.
  // Pour aller plus loin: https://angular.dev/guide/components/importing
  imports: [NgOptimizedImage, GameCard],
  templateUrl: './app.template.html',
})
export class App {
  protected readonly nomApplication = 'WishFlix';
  // Signal booleen: etat UI local du filtre "disponibles uniquement".
  // https://angular.dev/guide/signals
  protected readonly onlyAvailable = signal<boolean>(false);
  // Signal principal: source de verite locale de la liste de jeux.
  // https://angular.dev/guide/signals
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

  // computed(): etat derive, recalcule automatiquement selon les dependances lues.
  // https://angular.dev/guide/signals
  protected readonly visibleGames = computed(() => {
    if (!this.onlyAvailable()) return this.games();
    return this.games().filter((game) => game.available);
  });

  protected filterByAvailibility(): void {
    // update() modifie le signal sans mutation directe et declenche le recalcul des computed.
    // https://angular.dev/guide/signals
    this.onlyAvailable.update((available) => !available);
  }

  // computed de presentation: derive le texte du bouton a partir de onlyAvailable().
  // https://angular.dev/guide/signals
  protected filterAvailibilityLabel = computed((): string => {
    return this.onlyAvailable() ? 'Voir tous les jeux' : 'Voir les jeux disponibles';
  });
}
