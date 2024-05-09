import { Component, Inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IAppointment } from '../model/appointment-manager';

@Component({
  selector: 'app-new-appointment',
  templateUrl: './new-appointment.component.html',
  styleUrls: ['./new-appointment.component.css']
})
export class NewAppointmentComponent {
  appointmentForm: FormGroup = new FormGroup({});

  requiredFormControl = new FormControl('', [Validators.required]);

  constructor(
    public dialogRef: MatDialogRef<NewAppointmentComponent>,
    @Inject(MAT_DIALOG_DATA) public data: IAppointment,
    formBuilder: FormBuilder
  ) {
    this.appointmentForm = formBuilder.group({
      title: [],
      date: this.requiredFormControl,
      description: [],
    });

    this.appointmentForm.patchValue(data);
  }
  get formControls() {
    return this.appointmentForm.controls;
  }

  onNoClick(): void {
    this.dialogRef.close(null);
  }

  onSaveAppointment() {
    if (this.appointmentForm.invalid) {
      return;
    }
    this.dialogRef.close(this.appointmentForm.value);
  }
}
