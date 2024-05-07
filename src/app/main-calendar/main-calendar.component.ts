import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { SharedService } from '../services/shared.service';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { NewAppointmentComponent } from '../new-appointment/new-appointment.component';
interface IHour {
  name: string;
  time: string;
  event?: IEvent;
}

export interface IEvent {
  title: string;
  description?: string;
  date: Date;
  hasEvent?: boolean;
}

export interface IEventDate {
  date: Date;
  events: IEvent[];
}


@Component({
  selector: 'app-main-calendar',
  templateUrl: './main-calendar.component.html',
  styleUrls: ['./main-calendar.component.scss']
})
export class MainCalendarComponent {
  hours: IHour[];
  events: IEvent[] = [];
  dateEvents: IEventDate[] = [];
  currentDate!: Date;

  constructor(public dialog: MatDialog, public sharedService: SharedService) {
    this.hours = Array.from(Array(24).keys()).map((index) => ({
      name: index.toString(),
      time: index.toString(),
    }));
    this.sharedService.selectedDate.subscribe((value: any) =>{
      this.currentDate = value;
      let currentDateEvent = this.dateEvents.find((dateEvent:IEventDate) => this.isSameDates(dateEvent.date, this.currentDate))
      if (currentDateEvent) {
        this.events = currentDateEvent.events;
      } else {
        this.onMakeEmptyEvents();
      }
      
      
    });


    // this.onMakeEmptyEvents();
  }

  onMakeEmptyEvents() {
    const date = this.currentDate || new Date();

    this.events = Array.from(Array(24).keys()).map((index) => ({
      title: '',
      description: '',
      date: new Date(date.setHours(index, 0, 0)),
    }));
    this.dateEvents.push({date: this.currentDate, events: this.events});
  }

  onChangeDate() {
    this.onMakeEmptyEvents();
  }

  drop(event: CdkDragDrop<IEvent[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray( event.container.data, event.previousIndex, event.currentIndex );

      this.events.forEach((event:IEvent, index: number) =>{
        event.date = new Date(this.currentDate.setHours(index, 0, 0));
      })
    }
  }

  onModifyEvent(index: number): void {
    let newEvent: IEvent = this.events[index];

    const dialogRef = this.dialog.open(NewAppointmentComponent, {
      data: newEvent,
      minWidth: 'min(400px , 100%)',
    });

    dialogRef.afterClosed().subscribe((result: IEvent) => {
      if (result) {
        if (this.isSameDates(result.date, this.currentDate)) {
          this.events[index] = {
            ...result,
            date: this.events[index].date,
            hasEvent: true,
          };
        } else {
          // this.onMakeEmptyEvents();
          let dateFound: IEventDate | undefined = this.dateEvents.find((dateEvent: IEventDate) => this.isSameDates(dateEvent.date, result.date));
          if (dateFound) {
            dateFound.events[index]={
              ...result,
              date: new Date(result.date.setHours(index, 0, 0)),
              hasEvent: true,
            };
          } else {
            let newDateEvent: IEventDate = {
              date : new Date(result.date.setHours(index, 0, 0)), 
              events:[{
                ...result,
              date: new Date(result.date.setHours(index, 0, 0)),
              hasEvent: true,
            }]}

            // this.events[index] = 
            this.dateEvents.push(newDateEvent);
          }
          this.currentDate = result.date;
          this.sharedService.selectedDate.next(this.currentDate);
        }
      }
    });
  }

  addHours(date: Date, hours: number) {
    const hoursToAdd = hours * 60 * 60 * 1000;
    date.setTime(date.getTime() + hoursToAdd);
    return date;
  }

  isSameDates(firstDate: Date, secondDate: Date): boolean {
    const firstYear = firstDate.getFullYear();
    const firstMonth = firstDate.getMonth();
    const firstDay = firstDate.getDate();
    const secondYear = secondDate.getFullYear();
    const secondMonth = secondDate.getMonth();
    const secondDay = secondDate.getDate();

    switch (true) {
      case firstYear === secondYear &&
        firstMonth === secondMonth &&
        firstDay === secondDay:
        return true;
      case firstYear < secondYear ||
        (firstYear === secondYear && firstMonth < secondMonth) ||
        (firstYear === secondYear &&
          firstMonth === secondMonth &&
          firstDay < secondDay):
        // "firstDate is earlier than secondDate.";
        return false;
      default:
        // "firstDate is later than secondDate.";
        return false;
    }
  }

  hourTime(hour:IHour ){
    return hour.time;
  }
}
