import { Passenger } from "./models/passengers.interface";
import { Http, Response, Headers, RequestOptions } from "@angular/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";
import "rxjs/add/operator/map";
import "rxjs/add/operator/catch";
import "rxjs/add/observable/throw";

//import "rxjs/add/operator/toPromise";

const PASSENGER_API: string = "/api/passengers";

@Injectable()
export class PassengerDashBoardService {
  constructor(private http: Http) {}
  
  getpassenger(id: number): Observable<Passenger> {
    //getpassengers(): Promise<Passenger[]> {
    return this.http
      .get(`${PASSENGER_API}/${id}`)
      //.toPromise()
      //.then((response: Response) => response.json());
      .map((response: Response) => response.json())
      .catch((error: any) => Observable.throw(error.json()));
      
  }

  getpassengers(): Observable<Passenger[]> {
    //getpassengers(): Promise<Passenger[]> {
    return this.http
      .get(PASSENGER_API)
      //.toPromise()
      //.then((response: Response) => response.json());
      .map((response: Response) => response.json())
      .catch((error: any) => Observable.throw(error.json()));
      
  }

  updatepassenger(passenger: Passenger): Observable<Passenger> {
    //updatepassenger(passenger: Passenger): Promise<Passenger> {
    let headers = new Headers({
      'Content-Type': 'application/json'
    });
    let options = new RequestOptions({
      headers: headers
    })
    return this.http
      .put(`${PASSENGER_API}/${passenger.id}`, passenger, options)
      //.toPromise()
      //.then((response: Response) => response.json());
      .map((response: Response) => response.json())
      .catch((error: any) => Observable.throw(error.json()));
  }

  removepassenger(passenger: Passenger): Observable<Passenger> {
    //removepassenger(passenger: Passenger): Promise<Passenger> {
    return this.http
      .delete(`${PASSENGER_API}/${passenger.id}`)
      //.toPromise()
      //.then((response: Response) => response.json());
      .map((response: Response) => response.json())
      .catch((error: any) => Observable.throw(error.json()));
  }
}
