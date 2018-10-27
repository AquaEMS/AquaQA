import { Component, OnInit, ViewChild } from '@angular/core';
import { QA }    from './qa_class/qa.class';
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
  public prec_disable: boolean = false;


  constructor(private api: apiService, private http: Http){};

  title = 'New QA';
  isActive = false;
  qa: any = {
    date: "",
    prid: 0,
    description: "",
    determinant: 0,
    tic: {},
    ticnine: "",
    preceptor: {},
    precnine: "",
    noPrec: false,
    comments: "",
    flagged: "",
    questions: [],
    reviewer: 0,
    reviewDate: ""
  };

/*

[
  {
    "qa_id": null,
    "prid": 12345678,
    "date": "2018-09-01",
    "description": "Traumatic injury",
    "tic": 1,
    "preceptor": null,
    "determinant": 5,
    "comments": "Some text here",
    "reviewer": 2,
    "flagged": 0,
    "reviewDate": "2018-09-04 19:20"
  },
  {
    "questions": [
      {
        "question_id": 1,
        "response": 1
      },
      {
        "question_id": 2,
        "response": 0
      },
      {
        "question_id": 3,
        "response": 2
      }
    ]
  }
]

*/

public togglePrec(){
  this.prec_disable = !this.prec_disable;
  this.qa.preceptor = "";
  this.qa.precnine = "";
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
      });
  }

}
