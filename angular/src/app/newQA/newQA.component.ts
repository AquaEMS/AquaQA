import { Component, OnInit, ViewChild } from '@angular/core';
import { QA }    from '../qa';
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
  private tics = ['Dan Bruce', 'David Sparkman', 'Ricky Rescue'];


  constructor(private api: apiService, private http: Http){};

  title = 'New QA';
  isActive = false;
  qa: object = {
    date: "",
    prid: 0,
    problem: "",
    determinant: "NONE",
    tic: "",
    ticnine: "",
    preceptor: "",
    precnine: "",
    noPrec: false,
    yn1: "",
    yn2: "",
    yn3: "",
    yn4: "",
    yn5: "",
    yn6: "",
    yn7: "",
    yn8: "",
    flagged: ""
  };

  @ViewChild('instance') instance: NgbTypeahead;
  focus$ = new Subject<string>();
  click$ = new Subject<string>();

  search = (text$: Observable<string>) => {
    const debouncedText$ = text$.pipe(debounceTime(200), distinctUntilChanged());
    const clicksWithClosedPopup$ = this.click$.pipe(filter(() => !this.instance.isPopupOpen()));
    const inputFocus$ = this.focus$;

    return merge(debouncedText$, inputFocus$, clicksWithClosedPopup$).pipe(
      map(term => (term === '' ? this.tics
        : this.tics.filter(v => v.toLowerCase().indexOf(term.toLowerCase()) > -1)).slice(0, 10))
    );
  }

  public sendQA(){
    console.log(this.qa);
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
        this.preceptors = response;
        console.log(this.preceptors);
      });
    this.api.getUsers().subscribe(
      response => {
        this.ccs = response;
        console.log(this.ccs)
      }
    )
    // this.api.getQuestions().subscribe(
    //   response => {
    //     this.qs = response;
    //     console.log(this.qs);
    //   });
  }

}
