// THINGS ANGULAR MADE
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';


// PACKAGES (THINGS OTHER PEOPLE)
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
// import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { UiSwitchModule } from 'ngx-toggle-switch';
import { NgSelectModule } from '@ng-select/ng-select';
import fontawesome from '@fortawesome/fontawesome-free';


// THINGS WE MADE
import { NewQAComponent } from './newQA/newQA.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { apiService } from './services/api.service';
import { SettingsComponent } from './settings/settings.component';
import { HomeComponent } from './home/home.component';
import { AppRoutingModule } from './app-routing/app-routing.module';
import { CounterPipe } from './newQA/helpers/counter.pipe';
import { LoginComponent } from './login/login.component';
import { AuthenticationService } from './auth/auth.service';
import { AuthGuard } from './auth/auth.guard';
import { AlertComponent } from './alert/alert.component';
import { UserService } from './services/user.service';
import { JwtInterceptor } from './services/jwt.interceptor';
import { ErrorInterceptor } from './services/error.interceptor';
import { AlertService } from './services/alert.service';


@NgModule({
  declarations: [
    AppComponent,
    NewQAComponent,
    HeaderComponent,
    FooterComponent,
    SettingsComponent,
    HomeComponent,
    CounterPipe,
    LoginComponent,
    AlertComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    NgbModule,
    HttpModule,
    BrowserAnimationsModule,
    UiSwitchModule,
    NgSelectModule,
    ReactiveFormsModule,
    HttpClientModule
    ],
  providers: [
        apiService,
        AuthenticationService,
        AuthGuard,
        AlertService,
        UserService,
        { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
        { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
      ],
  bootstrap: [AppComponent]
})
export class AppModule { }
