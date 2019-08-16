import { Component, OnInit } from '@angular/core';
import { JwBootstrapSwitchNg2Module } from 'jw-bootstrap-switch-ng2';
import { Observable } from 'rxjs/Observable';
import { AuthenticationService } from './../auth/auth.service';

@Component({
  selector: 'header-component',
  templateUrl: './header.component.html'
  // styleUrls: ['./header.component.css']
})

export class HeaderComponent {

  // isLoggedIn$: Observable<boolean>;                  // {1}

  constructor(private authService: AuthenticationService) { }

  // ngOnInit() {
  //   this.isLoggedIn$ = false; // {2}
  // }
  //
  // onLogout(){
  //   // this.authService.logout();                      // {3}
  // }
}
