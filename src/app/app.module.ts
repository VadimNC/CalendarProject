import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {FormsModule} from '@angular/forms';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {CalendarComponent} from './calendar/calendar.component';
import {DayComponent} from './calendar/day.component';
import {CalendPipe} from './shared/calend-pipe';
import {HttpClientInMemoryWebApiModule} from 'angular-in-memory-web-api';
import {InMemoryDataService} from './shared/in-memory-data.service';
import {TasksComponent} from './tasks/tasks.component';
import {HttpClientModule} from '@angular/common/http';
import {CalendarDataService} from './shared/calendar-data.service';

@NgModule({
  declarations: [
    AppComponent,
    DayComponent,
    CalendarComponent,
    TasksComponent,
    CalendPipe,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    NgbModule,
    HttpClientModule,
    // virtual WEB api
    HttpClientInMemoryWebApiModule.forRoot(
      InMemoryDataService, { dataEncapsulation: false }
    )
  ],
  providers: [CalendarDataService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
