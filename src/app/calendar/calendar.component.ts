import {Component, ElementRef, EventEmitter, OnInit, Output, Renderer2, ViewChild} from '@angular/core';
import {DayComponent} from './day.component';
import {ActivatedRoute} from '@angular/router';
import {CalendarDataService} from '../shared/calendar-data.service';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {
  public choseDay: DayComponent;
  @Output('selectedMyUserId') selectedMyUserWithoutId: EventEmitter<any> = new EventEmitter();

  public calendar: DayComponent[] = [];
  public monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  public displayMonth: string;
  private monthIndex = 0;
  @ViewChild('addButton') private setTodayDay: ElementRef;

  constructor( private renderer: Renderer2) {
  }

  ngOnInit(): void {
    const buttonSetCurrentMonth = this.renderer.createElement('button');
    const buttonText = this.renderer.createText('Today');
    this.renderer.appendChild(buttonSetCurrentMonth, buttonText);
    this.renderer.appendChild(this.setTodayDay.nativeElement, buttonSetCurrentMonth);
    this.renderer.listen(this.setTodayDay.nativeElement, 'click', () => {
      this.monthIndex = 0;
      this.generateCalendarDays(this.monthIndex);
    });

    this.generateCalendarDays(this.monthIndex);
  }

  private generateCalendarDays(monthIndex: number): void {
    this.calendar = [];
    const day: Date = new Date(new Date().setMonth(new Date().getMonth() + monthIndex));
    this.displayMonth = this.monthNames[day.getMonth()];
    const startingDateOfCalendar = this.getStartDateForCalendar(day);
    let dateToAdd = startingDateOfCalendar;

    for (let i = 0; i < 42; i++) {
      this.calendar.push(new DayComponent(new Date(dateToAdd)));
      dateToAdd = new Date(dateToAdd.setDate(dateToAdd.getDate() + 1));
    }
  }

  private getStartDateForCalendar(selectedDate: Date) {
    const lastDayOfPreviousMonth = new Date(selectedDate.setDate(0));
    let startingDateOfCalendar: Date = lastDayOfPreviousMonth;

    if (startingDateOfCalendar.getDay() !== 1) {
      do {
        startingDateOfCalendar = new Date(startingDateOfCalendar.setDate(startingDateOfCalendar.getDate() - 1));
      } while (startingDateOfCalendar.getDay() !== 1);
    }

    return startingDateOfCalendar;
  }

  public increaseMonth() {
    this.monthIndex++;
    this.generateCalendarDays(this.monthIndex);
  }

  public decreaseMonth() {
    this.monthIndex--;
    this.generateCalendarDays(this.monthIndex);
  }

/*  public setCurrentMonth() {
    this.monthIndex = 0;
    this.generateCalendarDays(this.monthIndex);
  }*/
  select(): void {
    //const value = this.d;
    this.selectedMyUserWithoutId.emit();
  }
}
