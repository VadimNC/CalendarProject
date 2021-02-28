import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Task} from './task';
import {CalendarDataService} from '../shared/calendar-data.service';
import {DayComponent} from '../calendar/day.component';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {
  tasks: Task[];
  @Input('dayChose') dayChose: DayComponent;

  constructor(private calService: CalendarDataService) {
  }

  ngOnInit() {
    this.getTasks();
  }

  getTasks(): void {
    this.calService.getTasks()
      .subscribe(tasks => this.tasks = tasks);
  }

  add(value: string): void {
    value = value.trim();
    if (!value) {
      return;
    }
    this.calService.addTask({value} as Task)
      .subscribe(task => {
        this.tasks.push(task);
      });
  }

  delete(task: Task): void {
    this.tasks = this.tasks.filter(h => h !== task);
    this.calService.deleteTask(task).subscribe();
  }
}
