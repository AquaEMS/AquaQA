import { Component, OnInit } from '@angular/core';
import { JwBootstrapSwitchNg2Module } from 'jw-bootstrap-switch-ng2';
import { Observable } from 'rxjs/Observable';
import { AuthService } from './../auth/auth.service';

@Component({
  selector: 'header-component',
  templateUrl: './header.component.html'
  // styleUrls: ['./header.component.css']
})

export class HeaderComponent implements OnInit {

  isLoggedIn$: Observable<boolean>;                  // {1}

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.isLoggedIn$ = this.authService.isLoggedIn; // {2}
  }

  onLogout(){
    this.authService.logout();                      // {3}
  }
}
