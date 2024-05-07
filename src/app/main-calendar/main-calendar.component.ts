import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { SharedService } from '../services/shared.service';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { NewAppointmentComponent } from '../new-appointment/new-appointment.component';
import { AppointmentManager, IAppointment, IAppointmentOfDay, IHour } from '../model/appointment-manager';



@Component({
  selector: 'app-main-calendar',
  templateUrl: './main-calendar.component.html',
  styleUrls: ['./main-calendar.component.scss']
})
export class MainCalendarComponent {
  events: IAppointment[] = [];
  currentDayAppointments?: IAppointmentOfDay;
  currentDate: Date = new Date();
  appointmentManager = new AppointmentManager();

  constructor(public dialog: MatDialog, public sharedService: SharedService) {
    this.sharedService.selectedDate.subscribe((value: any) => {
      this.currentDate = value;
      let currDayAppoints = this.appointmentManager.appointmentList.find((dateEvent: IAppointmentOfDay) => this.appointmentManager.isSameDates(dateEvent.date, this.currentDate))
      if (currDayAppoints) {
        this.currentDayAppointments = currDayAppoints;
      } else{
        this.currentDayAppointments = this.appointmentManager.createAppointmentsOfDay(this.currentDate);
      }
    });
  }

  moveAppointment(event: CdkDragDrop<IAppointment[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);

      this.currentDayAppointments?.appointments.forEach((appointment: IAppointment, index: number) => {
        appointment.date = new Date(this.currentDate.setHours(index, 0, 0));
      })
    }
  }

  onModifyEvent(index: number): void {
    let newAppointment: IAppointment| undefined = this.currentDayAppointments?.appointments[index];

    if (newAppointment) {
      const dialogRef = this.dialog.open(NewAppointmentComponent, {
        data: newAppointment,
        minWidth: 'min(400px , 100%)',
      });

      dialogRef.afterClosed().subscribe((result: IAppointment) => {
        if (result) {
          this.appointmentManager.registerOrUpdateAppointment(result, index);
        }
      });
    } else {

    }
  }

  addHours(date: Date, hours: number) {
    const hoursToAdd = hours * 60 * 60 * 1000;
    date.setTime(date.getTime() + hoursToAdd);
    return date;
  }


}
