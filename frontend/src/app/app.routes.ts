import { Routes } from '@angular/router';
import { Acceuil } from './pages/acceuil/acceuil';
import { Buy } from './pages/buy/buy';
import { MapPage } from './pages/map/map';
import { AnnonceDetail } from './pages/annonce-detail/annonce-detail';

export const routes: Routes = [
    {path: '', component: Acceuil},
    {path: 'buy', component: Buy},
    {path: 'map', component: MapPage},
    {path: 'annonce/:id', component: AnnonceDetail},
];
