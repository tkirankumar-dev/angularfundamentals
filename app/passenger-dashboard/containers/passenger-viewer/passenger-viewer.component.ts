import { Component, OnInit } from "@angular/core";

import { PassengerDashBoardService } from "../../passenger-dashboard.service";
import { Passenger } from "../../models/passengers.interface";
import { ActivatedRoute, Router, Params } from "@angular/router";

import 'rxjs/add/operator/switchMap';

@Component({
  selector: "passenger-viewer",
  styleUrls: ["passenger-viewer.component.scss"],
  template: `
    <div>
      <button (click)="goBack()">&lsaquo;&lsaquo; Go Back</button>
      <passenger-form [detail]="passenger" (update)="onUpdatePassenger($event)">
      </passenger-form>
    </div>
  `
})
export class PassengerViewerComponent implements OnInit {
  passenger: Passenger;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private passengerService: PassengerDashBoardService
  ) {}
  ngOnInit() {
    this.route.params
      .switchMap((data: Params) => {
          return this.passengerService
          .getpassenger(data.id);
      })    
      .subscribe((data: Passenger) => (this.passenger = data));
  }

  onUpdatePassenger(event: Passenger) {
    this.passengerService
      .updatepassenger(event)
      .subscribe((date: Passenger) => {
        this.passenger = Object.assign({}, this.passenger, event);
      });
  }

  goBack(){
    this.router.navigate(['/passengers']);
  }
}
