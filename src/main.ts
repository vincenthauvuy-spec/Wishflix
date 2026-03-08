import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { App } from './app/app';

import './app/app.css';

// bootstrapApplication demarre l'application a partir du composant racine App.
// Cette API standalone evite un NgModule de bootstrap et centralise la configuration initiale.
// Dans WishFlix, le point d'entree reste minimal et lisible pour des debutants.
// Pour aller plus loin: https://angular.dev/api/platform-browser/bootstrapApplication
bootstrapApplication(App, appConfig).catch((err) => console.error(err));
