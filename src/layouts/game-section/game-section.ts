import { Component, input } from '@angular/core';

@Component({
  selector: 'game-section',
  imports: [],
  templateUrl: './game-section.html',
  styleUrl: './game-section.css',
})
export class GameSection {
  title = input.required<string>();
  subtitle = input<string>();
}
