import { Component, input } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { Game } from './game.model';

@Component({
  imports: [NgOptimizedImage],
  selector: 'game-card',
  templateUrl: './game-card.template.html',
})
export class GameCard {
  // Input détermine une propriété configurable de notre composant
  game = input.required<Game>();
}
