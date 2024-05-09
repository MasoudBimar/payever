import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarRef, SimpleSnackBar } from '@angular/material/snack-bar';
import { AppointmentManager, IAppointment } from '../model/appointment-manager';
import { NewAppointmentComponent } from '../new-appointment/new-appointment.component';
import { SharedService } from '../services/shared.service';



@Component({
  selector: 'app-main-calendar',
  templateUrl: './main-calendar.component.html',
  styleUrls: ['./main-calendar.component.scss']
})
export class MainCalendarComponent {
  currentDate: Date = new Date();
  appointmentManager = new AppointmentManager();

  constructor(public dialog: MatDialog, public sharedService: SharedService,public snackBar: MatSnackBar) {
    this.sharedService.selectedDate.subscribe((newDate: Date) => {
      this.currentDateChanged(newDate);
    });
  }

  moveAppointment(event: CdkDragDrop<IAppointment[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
      const date = new Date(this.currentDate.toString());
      this.appointmentManager.currentDayAppointments?.appointments.forEach((appointment: IAppointment, index: number) => {
        appointment.date = new Date(date.setHours(index, 0, 0));
      })
    }
  }

  onCreateOrModifyAppointment(index: number): void {
    const newAppointment: IAppointment | undefined = this.appointmentManager.currentDayAppointments?.appointments[index];

    if (newAppointment) {
      const dialogRef = this.dialog.open(NewAppointmentComponent, {
        data: newAppointment,
        minWidth: 'min(400px , 100%)',
      });

      dialogRef.afterClosed().subscribe((result: IAppointment) => {
        if (result) {
          this.appointmentManager.registerOrUpdateAppointment(result, index);
          this.openSnackBar("Appointment added", 'Approve');
        }
      });
    }
  }

  addHours(date: Date, hours: number) {
    const tempDate = new Date(date.toString());
    const hoursToAdd = hours * 60 * 60 * 1000;
    tempDate.setTime(tempDate.getTime() + hoursToAdd);
    return tempDate;
  }

  currentDateChanged(date: Date) {
    this.currentDate = date;
    this.appointmentManager.getAppintmentOfDay(this.currentDate);
    this.openSnackBar("Current Date changed", 'Approve');
  }

  removeAppointment(event: MouseEvent, index: number){
    event.stopPropagation();
    this.appointmentManager.removeAppointment(index);
    this.openSnackBar("Appointment removed", 'Approve');
  }

  openSnackBar(message: string, action: string) : MatSnackBarRef<SimpleSnackBar> {
    return this.snackBar.open(message, action, {
      duration: 5000,
    });
  }


}
