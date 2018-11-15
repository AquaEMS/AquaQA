import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { NewQAComponent } from '../newQA/newQA.component';
import { SettingsComponent } from '../settings/settings.component';
import { HomeComponent } from  '../home/home.component';
import { LoginComponent } from '../login/login.component';
import { AuthGuard } from '../auth/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'new-qa', component: NewQAComponent, canActivate: [AuthGuard] },
  { path: 'settings', component: SettingsComponent, canActivate: [AuthGuard] },
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes, {useHash: true}) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
