import { Routes } from '@angular/router';
import { PersonalcolegioComponent } from './comp/personalcolegio/personalcolegio.component';
import { PpffComponent } from './comp/ppff/ppff.component';
import { PersonaexternaComponent } from './comp/personaexterna/personaexterna.component';
import { InicioComponent } from './comp/inicio/inicio.component';
import { IngresoPersonalComponent } from './comp/ingreso-personal/ingreso-personal.component';
import { IngresoPpffComponent } from './comp/ingreso-ppff/ingreso-ppff.component';
import { IngresoPersonaexternaComponent } from './comp/ingreso-personaexterna/ingreso-personaexterna.component';
import { LoginComponent } from './comp/login/login.component';
import { RegistroComponent } from './comp/registro/registro.component';
import { authGuard } from './auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'registro', component: RegistroComponent },
  { path: 'PersonalColegio', component: PersonalcolegioComponent, canActivate: [authGuard] },
  { path: 'PPFF', component: PpffComponent, canActivate: [authGuard] },
  { path: 'PersonaExterna', component: PersonaexternaComponent, canActivate: [authGuard] },
  { path: 'IngresoPersonalColegio', component: IngresoPersonalComponent, canActivate: [authGuard] },
  { path: 'IngresoPPFF', component: IngresoPpffComponent, canActivate: [authGuard] },
  { path: 'IngresoPE', component: IngresoPersonaexternaComponent, canActivate: [authGuard] },
  { path: 'inicio', component: InicioComponent, canActivate: [authGuard] },
  { path: '**', redirectTo: '/login' }  // Redirige a login para rutas no encontradas
];
