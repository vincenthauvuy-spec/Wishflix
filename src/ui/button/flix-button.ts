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

    if (this.type()) classes.push(`btn-${this.type()}`);
    if (this.size()) classes.push(`btn-${this.size()}`);

    return classes;
  }
}
