import { Component, Input, Output, EventEmitter, OnChanges, OnInit } from '@angular/core';
import { Passenger } from '../../models/passengers.interface';

@Component({
    selector: 'passenger-detail',
    styleUrls: ['passenger-detail.component.scss'],
    template: `
        <div>
            <span class="status" [class.checked-in]="detail.checkedIn"></span>
            <div *ngIf="isEditing">
                <input 
                    type="text" 
                    [value]="detail.fullname"
                    (input)="onNameChange(name.value)"
                    #name />
            </div>
            <div *ngIf="!isEditing">
                {{ detail.fullname }}
            </div>
            <div class="date">
            Check in date:
            {{
                detail.checkInDate
                ? (detail.checkInDate | date: "yMMMMd" | uppercase)
                : "Not checked in"
            }}
            </div>
            <div class="children">
            Children: {{ detail.children?.length || 0 }}
            </div>
            <button (click)="toggleEdit()">
                {{ isEditing ? 'Done' : 'Edit' }}
            </button>
            <button (click)="onRemove()">
                Remove
            </button>
            <button (click)="goToPassengers()">
                View
            </button>
        </div>
    `
})

export class PassengerDetailComponent implements OnChanges, OnInit{
    @Input()
    detail: Passenger;

    @Output()
    edit: EventEmitter<Passenger> = new EventEmitter<Passenger>();

    @Output()
    remove: EventEmitter<Passenger> = new EventEmitter<Passenger>();
    // remove = new EventEmitter();
    
    @Output()
    view: EventEmitter<Passenger> = new EventEmitter<Passenger>();

    ngOnChanges(changes: any) {
        if(changes.detail){
            this.detail = Object.assign({}, changes.detail.currentValue );
        }
        console.log('ngOnChanges');
    }

    ngOnInit(){
        console.log('ngOnInIt');
    }

    isEditing: boolean = false;
    onratechange(value: string){
        this.detail.fullname = value;
    }

    onNameChange(value: string){
        this.detail.fullname = value;
    }

    toggleEdit(){
        if(this.isEditing){
            this.edit.emit(this.detail);
        }
        this.isEditing = !this.isEditing;
    }
    onRemove(){
        this.remove.emit(this.detail);
    }
    goToPassengers(){
        this.view.emit(this.detail);
    }
    constructor() {}
}