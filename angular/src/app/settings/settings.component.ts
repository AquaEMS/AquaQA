import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {

  constructor() { }

  user: object = {
    first: "",
    last: "",
    nine: "",
    email: "",
    username: "",
    pass_og: "",
    pass_conf: "",
    user_admin: "",
    user_qa: "",
    user_prec: ""
  }

  ngOnInit() {
  }

}
