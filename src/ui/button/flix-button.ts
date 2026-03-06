import { Component, input } from '@angular/core';

// Union Type typescript
type ButtonType = 'primary' | 'secondary' | 'outline';
type ButtonSize = 'sm' | 'md' | 'lg';

@Component({
  selector: 'flix-button',
  templateUrl: './button.html',
})
export class FlixButton {
  type = input<ButtonType>();
  size = input<ButtonSize>();

  // Getter JavaScript
  get classes(): Array<string> {
    const classes = [];

    // Hack (very bad :-))) spécifique à DaisyUI (et Tailwind)
    // Pour le forcer à générer le CSS des boutons
    // @todo Voir sur DaisyUI/Tailwind comment forcer
    // la génération de certaines classes même si inutilisé

    // btn-primary
    // btn-outline
    // btn-secondary
    // btn-xs
    // btn-sm
    // btn-md
    // btn-lg
    // btn-xl

    if (this.type()) classes.push(`btn-${this.type()}`);
    if (this.size()) classes.push(`btn-${this.size()}`);

    return classes;
  }
}
