import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { NewQAComponent } from '../newQA/newQA.component';


const routes: Routes = [
  { path: '', redirectTo: '/NewAQ', pathMatch: 'full' },
  { path: 'NewAQ', component: NewQAComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
