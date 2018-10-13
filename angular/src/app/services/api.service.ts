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

    private apiURL: string = "127.0.0.1:3000/api/";
    private token: string = "y9QoBe1bTC";

    constructor(private http: Http) {
      // this.options = new RequestOptions({ headers: this.headers });
    }

  private handleError(error: any): Promise<any> {
    console.error("An error occurred", error);
    return Promise.reject(error.message || error);
  }

    public getDeterminants(): Observable<any[]> {
      console.log("GD")
      return this.http.get(this.apiURL + 'get/determinants/' + this.token)
      .map(res => {
      console.log(res.json());
      console.log("Things") ;
      } )
      .catch("ERROR");
    }

  }
