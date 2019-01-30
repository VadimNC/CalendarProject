import {Component, OnInit} from '@angular/core';
import * as jsPDF from 'jspdf'

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {
  public today = new Date();
  public daysNum: any[] = [];
  public daystext = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  public show: boolean = false;
  public currentNum: number = null;
  public currentMonth = this.today.getMonth();
  public currentYear = this.today.getFullYear();
  public content: string = null;
  public contentList: any[] = [];

  public getDays(): void {
    for (let k = 1; k < 6; k++) {
      const tempMaxRowElements: number = Math.imul(k, 7);
      const tempMinRowElements: number = Math.imul(k - 1, 7);
      const tempArray: number[] = [];
      for (let i = tempMinRowElements; i < tempMaxRowElements; i++) {
        tempArray.push(i);
      }
      this.daysNum.push(tempArray);
    }
  }

  onSelect(date: any): void {
    this.show = true;
    this.currentNum = date;
  }

  ngOnInit() {
    this.getDays();
  }

  public next() {

    this.currentYear = (this.currentMonth === 11) ? this.currentYear + 1 : this.currentYear;
    this.currentMonth = (this.currentMonth + 1) % 12;
  }

  public previous() {
    this.currentYear = (this.currentMonth === 0) ? this.currentYear - 1 : this.currentYear;
    this.currentMonth = (this.currentMonth === 0) ? 11 : this.currentMonth - 1;
  }

  setCurrentNum(num: number): void {
    this.show = true;
    this.currentNum = num;
  }

  closePopup(num: number): void {
    this.show = false;
  }

  saveNote() {
    this.contentList.push(
      {date: this.currentNum + ' Jan ' + this.currentYear,
    content: 'notates:' + this.content
  });
  }

  generatePdf(): void {
    const doc = new jsPDF();
    let str = '';
    this.contentList.forEach((content) => {
      str += content['date'] + ' - ' + content['content'];
    });
    console.log(str);
    doc.text(str, 10, 10);
    doc.save('CalendareNotes.pdf');
  }
}
