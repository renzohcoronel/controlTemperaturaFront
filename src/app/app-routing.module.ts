import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent } from './components/dashboard.component';
import { DetalleSensorComponent } from './components/detalleSensor.component';
import { LoginComponent } from './components/login.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login',  component: LoginComponent },
  { path: 'dashboard',  component: DashboardComponent },
  { path: 'detalleSensor/:id',     component: DetalleSensorComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
