import { Component, OnInit } from "@angular/core";
import { Passenger } from "../../models/passengers.interface";
import { PassengerDashBoardService } from "../../passenger-dashboard.service";
import { Router } from "@angular/router";

@Component({
  selector: "passenger-dashboard",
  styleUrls: ["passenger-dashboard.component.scss"],
  template: `
    <div class="app">
      <passenger-count [items]="passengers"> </passenger-count>
      <div *ngFor="let passenger of passengers">
        {{ passenger.fullname }}
      </div>
      <passenger-detail
        *ngFor="let passenger of passengers"
        [detail]="passenger"
        (view)="handleView($event)"
        (edit)="handleEdit($event)"
        (remove)="handleRemove($event)"
      >
      </passenger-detail>
    </div>
  `
})
export class PassengerDashBoardComponent implements OnInit {
  passengers: Passenger[];
  handleRemove(event: Passenger) {
    this.passengerService
    .removepassenger(event)
    .subscribe((data : Passenger) => {
      //.then((data : Passenger) => {
      this.passengers = this.passengers.filter((passenger: Passenger) => {
        return passenger.id !== event.id;
      });
    });    
  }
  handleEdit(event: Passenger) {
    this.passengerService
      .updatepassenger(event)
      .subscribe((data: Passenger) => {
        //.then((data: Passenger) => {
        this.passengers = this.passengers.map((passenger: Passenger) => {
          if (passenger.id === event.id) {
            // Immutable operation
            passenger = Object.assign({}, passenger, event);
          }
          return passenger;
        });
      });
  }

  handleView(event: Passenger){
    this.router.navigate(['/passengers', event.id]);
  }

  constructor(
    private router: Router,
    
    private passengerService: PassengerDashBoardService
  ) {}
  ngOnInit(): void {
    this.passengerService.getpassengers()
    //.then((data: Passenger[]) => {
    .subscribe((data: Passenger[]) => {
      console.log(data);
      this.passengers = data;
    }, err => console.log('HTTP Error', err),
    () => console.log('HTTP request completed.'));
  }
}
