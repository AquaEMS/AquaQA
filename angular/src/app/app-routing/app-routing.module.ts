import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { NewQAComponent } from '../newQA/newQA.component';
import { SettingsComponent } from '../settings/settings.component';
import { HomeComponent } from  '../home/home.component';


const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'new-qa', component: NewQAComponent },
  { path: 'settings', component: SettingsComponent },
  { path: 'home', component: HomeComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes, {useHash: true}) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
