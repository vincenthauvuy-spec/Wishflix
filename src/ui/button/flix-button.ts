import { Component, input } from '@angular/core';

// Union types TypeScript: limite les variantes possibles de type et size.
// Le compilateur bloque les valeurs non prevues, ce qui evite des classes CSS invalides.
// Dans WishFlix, cela fiabilise le design system des boutons des la saisie du code.
// Pour aller plus loin: https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#union-types
type ButtonType = 'primary' | 'secondary' | 'outline';
type ButtonSize = 'sm' | 'md' | 'lg';

// Composant atomique: centralise le comportement d'un bouton reutilisable.
// Un seul composant limite la duplication de markup et garde un style coherent partout.
// Dans WishFlix, la meme API sert pour le hero, le filtre et la wishlist.
// Pour aller plus loin: https://angular.dev/essentials/components
@Component({
  selector: 'flix-button',
  templateUrl: './button.html',
})
export class FlixButton {
  // input(): expose une API claire au parent pour configurer apparence et taille.
  // Le composant reste flexible sans imposer de logique metier locale.
  // Dans WishFlix, cela facilite la reutilisation des boutons entre sections differentes.
  // Pour aller plus loin: https://angular.dev/guide/components/inputs
  type = input<ButtonType>();
  size = input<ButtonSize>();

  // Getter JavaScript: calcule les classes au moment de la lecture, sans appel explicite.
  // Angular lit `classes` comme une propriete dans le template et applique le resultat.
  // Dans WishFlix, ce choix garde le HTML court et concentre les regles de style en TypeScript.
  // Pour aller plus loin: https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Functions/get
  get classes(): Array<string> {
    const classes = [];

    // Tailwind/DaisyUI scanne surtout des classes statiques pendant le build.
    // Cette liste "force" la presence de variantes dynamiques qui pourraient sinon etre purgees.
    // Dans WishFlix, on garantit le rendu des boutons meme quand les classes sont construites en TS.
    // Pour aller plus loin: https://daisyui.com/docs/faq/#class-names-are-not-working

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
