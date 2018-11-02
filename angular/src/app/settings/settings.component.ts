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
  public user_list: Array<any> = [];
  public selected_user: any;
  public user_data: any;
  public edit = false;
  public show_details: boolean = false;

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
    if (this.user.password != this.user.pass_conf && this.user.pass_conf) {
      this.pass_mismatch = true;
    } else{
      if (!this.edit){
        console.log(this.user);
        this.api.createUser(this.user).subscribe(
          response => {
            console.log(response);
            this.user_success = true;
          }
        );
      } else{
        // EDIT THE USER
        console.log("Edit");
      }

    }

  }

  public onUserSelected(event){
    if (event){
      this.edit = true;
      this.api.getUserData(this.selected_user).subscribe(
        response => {
          this.user = response[0];
          console.log(this.user);
          this.show_details = true;
        }
      )
    } else{
      this.edit = false;
      this.user = {
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
    }

  }

  ngOnInit() {
    this.api.getUsers().subscribe(
      response => {
        for (let item of response){
          item.first_last = item.last + ", " + item.first + " | " + item.ninehundred;
        }
        this.user_list = response;
      }
    )
  }

}
