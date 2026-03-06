import { Component, input } from '@angular/core';
import { FlixButton } from '../../ui/button/flix-button';

@Component({
  selector: 'game-section',
  imports: [FlixButton],
  templateUrl: './game-section.html',
  styleUrl: './game-section.css',
})
export class GameSection {
  title = input.required<string>();
  subtitle = input<string>();
}
