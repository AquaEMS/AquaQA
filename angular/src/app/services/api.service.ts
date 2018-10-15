import { Injectable, Input, OnInit } from "@angular/core";
import { Headers, Http, RequestOptions, Response } from "@angular/http";
import "rxjs/add/operator/map";
import "rxjs/add/operator/toPromise";
import "rxjs/Rx";
import { map } from 'rxjs/operators';
import { BehaviorSubject } from "rxjs/BehaviorSubject";
import { Observable } from "rxjs";

// headers = new Headers();
// options: any;



@Injectable()
export class apiService {

  private apiURL: string = "http://localhost:5939/api/";
  private token: string = "y9QoBe1bTC";

  constructor(private http: Http) {
    // this.options = new RequestOptions({ headers: this.headers });
  }

  private extractData(res: Response) {
    let body = res.json();
    return body;
  }

  private handleError(error: any): Promise<any> {
    console.error("An error occurred", error);
    return Promise.reject(error.message || error);
  }

  public getDeterminants(): Observable<any[]> {
    let request = this.apiURL + 'get/determinants/' + this.token;
    return this.http.get(request).map(this.extractData);
  }

  public getPreceptors(): Observable<any[]> {
    let request = this.apiURL + 'get/preceptors/' + this.token;
    return this.http.get(request).map(this.extractData);
  }

  public getQuestions(): Observable<any[]> {
    let request = this.apiURL + 'get/qa/:qa_id/questions/' + this.token;
    return this.http.get(request).map(this.extractData);
  }

  public getUsers(): Observable<any[]> {
    let request = this.apiURL + '/get/users/' + this.token;
    return this.http.get(request).map(this.extractData);
  }

}
