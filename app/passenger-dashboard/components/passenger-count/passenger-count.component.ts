import { Component, Input } from '@angular/core';
import { Passenger } from '../../models/passengers.interface';

@Component({
    selector: 'passenger-count',
    template: `
        <div>
            <h3>Airline Passengers</h3>
            <div>
                Passengers Count: {{ items?.length }}                
            </div>
            <div>
                Passengers Checked In Count: {{ checkedInCount() }} / {{ items?.length }}
            </div>
        </div>
        <br /><br />
    `
})

export class PassengerCountComponent{
    @Input()
    items: Passenger[];
    checkedInCount() : number {
        if(!this.items) return;
        return this.items.filter((passenger: Passenger) => passenger.checkedIn).length;
    }
    constructor() {}
}