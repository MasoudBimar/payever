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
  eventForm: FormGroup = new FormGroup({});

  requiredFormControl = new FormControl('', [Validators.required]);

  constructor(
    public dialogRef: MatDialogRef<NewAppointmentComponent>,
    @Inject(MAT_DIALOG_DATA) public data: IAppointment,
    fb: FormBuilder
  ) {
    this.eventForm = fb.group({
      title: [],
      date: this.requiredFormControl,
      description: [],
    });

    this.formControls['title'].setValue(data.title || '');
    this.formControls['date'].setValue(data.date || '');
    this.formControls['description'].setValue(data.description || '');
  }
  get formControls() {
    return this.eventForm.controls;
  }

  onNoClick(): void {
    debugger;
    this.dialogRef.close(null);
  }

  onSaveEvent() {
    if (this.eventForm.invalid) {
      return;
    }
    // console.log(this.eventForm.value);
    this.dialogRef.close(this.eventForm.value);
  }
}
