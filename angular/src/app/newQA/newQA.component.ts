import { Component, OnInit, ViewChild } from '@angular/core';
import { QA }    from './helpers/qa.class';
import { apiService } from "../services/api.service";
import { Http } from '@angular/http';
// import 'rxjs/add/operator/map';
import {NgbTypeahead} from '@ng-bootstrap/ng-bootstrap';
import {Observable, Subject, merge} from 'rxjs';
import {debounceTime, distinctUntilChanged, filter, map} from 'rxjs/operators';


@Component({
  selector: 'NewQA',
  templateUrl: './newQA.component.html',
  styleUrls: ['./newQA.component.css']
})

export class NewQAComponent implements OnInit {

  private determinants: any;
  private preceptors: any;
  private qs: any;
  private ccs: any;
  public qa: QA;
  public prec_disable: boolean = false;
  public formReady: boolean = false;

  constructor(private api: apiService, private http: Http){};

  // qa: QA;

  title = 'New QA';
  isActive = false;
  qa: QA = {
    date: null,
    prid: null,
    description: null,
    determinant: 0,
    tic: null,
    preceptor: null,
    noPreceptor: false,
    comments: null,
    flagged: false,
    questions: [],
    reviewer: 0,
    reviewDate: null
  };

public togglePrec(){
  this.prec_disable = !this.prec_disable;
  this.qa.preceptor = null;
}

  public sendQA(){
    console.log(this.qa);
    this.api.createQA(this.qa).subscribe(
      response => {
        console.log(response);
      }
    );
  }

  public activateButton() {
    console.log("CLICKED!")
    this.isActive = true;
  }

  ngOnInit(){
    console.log("INIT")
    this.api.getDeterminants().subscribe(
      response => {
        this.determinants = response;
    });
    this.api.getPreceptors().subscribe(
      response => {
        for (let item of response){
          item.first_last = item.last + ", " + item.first + " | " + item.ninehundred;
        }
        this.preceptors = response;
      });
    this.api.getTics().subscribe(
      response => {
        for (let item of response){
          item.first_last = item.last + ", " + item.first + " | " + item.ninehundred;
        }
        this.ccs = response;
      }
    )
    this.api.getQuestions().subscribe(
      response => {
        this.qs = response;
        console.log(this.qs);
        this.qa = new QA(this.qs);
        console.log(this.qa);
        this.formReady = true;
      });
  }

}
