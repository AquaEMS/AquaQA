// THINGS ANGULAR MADE
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';

// PACKAGES (THINGS OTHER PEOPLE)
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { UiSwitchModule } from 'ngx-toggle-switch';
import { NgSelectModule } from '@ng-select/ng-select';

// THINGS WE MADE
import { NewQAComponent } from './newQA/newQA.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { apiService } from './services/api.service';
import { SettingsComponent } from './settings/settings.component';
import { HomeComponent } from './home/home.component';
import { AppRoutingModule } from './app-routing/app-routing.module';


@NgModule({
  declarations: [
    AppComponent,
    NewQAComponent,
    HeaderComponent,
    FooterComponent,
    SettingsComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    NgbModule,
    HttpModule,
    AngularFontAwesomeModule,
    BrowserAnimationsModule,
    UiSwitchModule,
    NgSelectModule,
  ],
  providers: [apiService],
  bootstrap: [AppComponent]
})
export class AppModule { }
