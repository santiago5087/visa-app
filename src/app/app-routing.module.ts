import { NgModule } from '@angular/core';
import { Routes, RouterModule, ExtraOptions } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { SupportComponent } from './components/support/support.component';
import { VisaFormComponent } from './components/visa-form/visa-form.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { HomeComponent } from './pages/home/home.component';

const routerOptions: ExtraOptions = {
  anchorScrolling: "enabled",
  scrollPositionRestoration: "enabled",
  useHash: true
}

const routes: Routes = [
  { path: 'inicio', component: HomeComponent },
  { path: 'soporte', component: SupportComponent },
  { path: 'login', component: LoginComponent },
  { path: 'registro/:tramite/:visa', component: VisaFormComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: '', redirectTo: 'inicio', pathMatch: 'full' },
  { path: '**', redirectTo: 'inicio', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, routerOptions)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
