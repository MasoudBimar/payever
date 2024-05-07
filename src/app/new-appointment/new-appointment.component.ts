import { Component, Inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IEvent } from '../main-calendar/main-calendar.component';

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
    @Inject(MAT_DIALOG_DATA) public data: IEvent,
    fb: FormBuilder
  ) {
    this.eventForm = fb.group({
      title: [],
      date: this.requiredFormControl,
      description: [],
    });

    this.f['title'].setValue(data.title || '');
    this.f['date'].setValue(data.date || '');
    this.f['description'].setValue(data.description || '');
  }
  get f() {
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
