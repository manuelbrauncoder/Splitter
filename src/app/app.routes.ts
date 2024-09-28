import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./pages/home/home.page').then((m) => m.HomePage),
  },
  {
    path: 'profile',
    loadComponent: () => import('./pages/profile/profile.component').then((m) => m.ProfileComponent),
  },
  {
    path: 'about',
    loadComponent: () => import('./pages/about/about.component').then((m) => m.AboutComponent),
  },
  {
    path: 'group-details/:id',
    loadComponent: () => import('./pages/group-details/group-details.component').then((m) => m.GroupDetailsComponent)
  },
  {
    path: 'expanses-list/:id',
    loadComponent: () => import('./pages/expanses-list/expanses-list.component').then((m) => m.ExpansesListComponent)
  },
  {
    path: 'expanse-details/:id/:index',
    loadComponent: () => import('./pages/expanse-details/expanse-details.component').then((m) => m.ExpanseDetailsComponent)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
];
