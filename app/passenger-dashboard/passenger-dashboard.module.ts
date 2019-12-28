import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http'
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
// Container
import { PassengerDashBoardComponent } from './containers/passenger-dashboard/passenger-dashboard.component';
import { PassengerViewerComponent } from './containers/passenger-viewer/passenger-viewer.component';

// Components
import { PassengerCountComponent } from './components/passenger-count/passenger-count.component';
import { PassengerDetailComponent } from './components/passenger-detail/passenger-detail.component';
import { PassengerFromComponent } from './components/passenger-form/passenger-form.component';

// Services
import { PassengerDashBoardService } from './passenger-dashboard.service';

const routes: Routes = [
    {
        path: 'passengers',
        children: [
            { path:'', component: PassengerDashBoardComponent },
            { path:':id', component: PassengerViewerComponent }
        ]        
    }
];

@NgModule({
    declarations: [
        PassengerDashBoardComponent,
        PassengerViewerComponent,
        PassengerCountComponent,
        PassengerDetailComponent,
        PassengerFromComponent        
    ],
    imports: [
        CommonModule,        
        HttpModule,
        FormsModule,
        RouterModule.forChild(routes)
    ],
    // One of the above components might rely on this service.
    providers: [
        PassengerDashBoardService
    ]
})

export class PassengerDashBoardModule{

}