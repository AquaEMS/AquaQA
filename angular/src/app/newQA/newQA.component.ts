import { Component, OnInit, ViewChild } from '@angular/core';
import { QA }    from './helpers/qa.class';
import { apiService } from "../services/api.service";
import { Http } from '@angular/http';
// import 'rxjs/add/operator/map';
import {NgbTypeahead} from '@ng-bootstrap/ng-bootstrap';
import {Observable, Subject, merge} from 'rxjs';
import {debounceTime, distinctUntilChanged, filter, map} from 'rxjs/operators';
import { CounterPipe } from './helpers/counter.pipe';


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
  public qa: any = {
    prid: null,
    date: null,
    description: null,
    determinant: null,
    tic: null,
    preceptor: null,
    noPreceptor: false,
    comments: null,
    flagged: false,
    reviewer: null,
    reviewDate: null
  };

  public prec_disable: boolean = false;
  public formReady: boolean = false;

  constructor(private api: apiService, private http: Http){
     this.qa = {
      prid: null,
      date: null,
      description: null,
      determinant: null,
      tic: null,
      preceptor: null,
      noPreceptor: false,
      comments: null,
      flagged: false,
      reviewer: null,
      reviewDate: null
    };
  };

  // qa: QA;

  title = 'New QA';
  isActive = false;
  // this.qa = new QA(this.getQs());

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

  public getQs(){
    this.api.getQuestions().subscribe(response => {
      console.log(response);
      return response;
    });
  }

  ngOnInit(){
    this.api.getDeterminants().subscribe(
      response => {
        this.determinants = response;
    });
    this.api.getQuestions().subscribe(
      response => {
        this.qs = response;
        console.log(this.qs);
        this.formReady = true;
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
  }

}
