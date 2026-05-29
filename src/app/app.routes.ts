import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { Produtos } from './pages/produtos/produtos';
import { Artistas } from './pages/artistas/artistas';
import { Ingressos } from './pages/ingressos/ingressos';
import { Categoria } from './pages/categoria/categoria';
import { Estudio } from './pages/estudio/estudio';
import { Login } from './pages/login/login';

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'produtos', component: Produtos },
  { path: 'artistas', component: Artistas },
  { path: 'ingressos', component: Ingressos },
  { path: 'estudio', component: Estudio },
  { path: 'login', component: Login },
  { path: 'categoria/:slug', component: Categoria },
  { path: '**', redirectTo: '' },
];