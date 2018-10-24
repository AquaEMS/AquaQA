import { Component, OnInit, ViewChild } from '@angular/core';
import { apiService } from "../services/api.service";
import { Http } from '@angular/http';
// import 'rxjs/add/operator/map';
import {NgbTypeahead} from '@ng-bootstrap/ng-bootstrap';
import {Observable, Subject, merge} from 'rxjs';
import {debounceTime, distinctUntilChanged, filter, map} from 'rxjs/operators';


@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {

  public pass_mismatch = false;
  public user_success = false;
  public user_error = false;

  constructor(private api: apiService, private http: Http) { }

  user: any = {
    first: "",
    last: "",
    ninehundred: "",
    email: "",
    username: "",
    password: "",
    pass_conf: "",
    admin: "",
    qa: "",
    preceptor: ""
  }



  public addUser(){
    this.pass_mismatch = false;
    if (this.user.password != this.user.pass_conf) {
      this.pass_mismatch = true;
    } else{
      console.log(this.user);
      this.api.createUser(this.user).subscribe(
        response => {
          console.log(response);
          this.user_success = true;
        }
      );
    }

  }

  ngOnInit() {
  }

}
