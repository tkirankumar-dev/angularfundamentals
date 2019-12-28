import { Component, Input, Output, EventEmitter } from "@angular/core";
import { Passenger } from "../../models/passengers.interface";
import { Baggage } from "../../models/baggage.interface";

@Component({
  selector: "passenger-form",
  styleUrls: ["passenger-form.component.scss"],
  template: `
    <form (ngSubmit)="handleSubmit(form.value, form.valid)" #form="ngForm" novalidate>
      <div>
        {{ detail | json }}
      </div>
      <div>
        Passenger Id:
        <div>
          <input
            type="number"
            required
            name="id"
            #id="ngModel"
            [ngModel]="detail?.id"
          />
        </div>
        <div class="error" *ngIf="id.errors?.required && id.dirty">
          Passenger ID is required
        </div>
      </div>
      <div>
        Passenger Name:
        <div>
          <input
            type="text"
            name="fullname"
            minlength="5"
            required
            #fullname="ngModel"
            [ngModel]="detail?.fullname"
          />
        </div>
        <div class="error" *ngIf="fullname.errors?.required && fullname.dirty">
          Passenger is required
        </div>
        <div class="error" *ngIf="fullname.errors?.required && fullname.touched">
          Passenger is required!!!
        </div>
        <div class="error" *ngIf="fullname.errors?.minlength && fullname.dirty">
          Minimum length should be 5!!!
        </div>
      </div>
      <div>
        <label>
          <input
            type="radio"
            [value]="true"
            name="checkedIn"
            [ngModel]="detail?.checkedIn"
            (ngModelChange)="toggleCheckIn($event)"
          />
          Yes
        </label>
        <label>
          <input
            type="radio"
            [value]="false"
            name="checkedIn"
            [ngModel]="detail?.checkedIn"
          />
          No
        </label>
      </div>
      <div>
        <label>
          <input
            type="checkbox"
            name="checkedIn"
            [ngModel]="detail?.checkedIn"
            (ngModelChange)="toggleCheckIn($event)"
          />
          Yes
        </label>
      </div>
      <div *ngIf="form.value.checkedIn">
        Check In Date:
        <input
          type="number"
          name="checkInDate"
          [ngModel]="detail?.checkInDate"
        />
      </div>
      <div>
        Baggage:
        <select name="baggage" [ngModel]="detail?.baggage">
          <option
            *ngFor="let item of baggage"
            [value]="item.key"
            [selected]="item.key === detail?.baggage"
          >
            {{ item.value }}
          </option>
        </select>
      </div>
      <div>
        Baggage:
        <select name="baggage" [ngModel]="detail?.baggage">
          <option *ngFor="let item of baggage" [ngValue]="item.key">
            {{ item.value }}
          </option>
        </select>
      </div>
      <div>{{ form.value | json }}</div>
      <div>Valid: {{ form.valid | json }}</div>
      <div>Invalid: {{ form.invalid | json }}</div>
      <button type="submit" [disabled]="form.invalid"> 
        Update Passenger
      </button>
    </form>
  `
})
export class PassengerFromComponent {
  @Input()
  detail: Passenger;

  @Output()
  update: EventEmitter<Passenger> = new EventEmitter<Passenger>();

  baggage: Baggage[] = [
    {
      key: "none",
      value: "No Baggage"
    },
    {
      key: "hand-only",
      value: "Hand Baggage"
    },
    {
      key: "hold-only",
      value: "Hold Baggage"
    },
    {
      key: "hand-hold",
      value: "Hand and hold Baggage"
    }
  ];

  toggleCheckIn(checkedIn: boolean) {
    if (checkedIn) {
      this.detail.checkInDate = Date.now();
    }
  }

  handleSubmit(passenger: Passenger, isValid: boolean){
    if(isValid){
        this.update.emit(passenger);
    }
  }
}
// [ngModel] bind creats a one way binding.
