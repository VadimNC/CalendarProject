import {Component} from '@angular/core';

@Component({
  selector: 'app-day',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class DayComponent {
  public date: Date;
  public title: string;
  public isPastDate: boolean;
  public isToday: boolean;

  constructor(d: Date) {
    this.date = d;
    this.isPastDate = d.setHours(0, 0, 0, 0) < new Date().setHours(0, 0, 0, 0);
    this.isToday = d.setHours(0, 0, 0, 0) === new Date().setHours(0, 0, 0, 0);
  }
}
