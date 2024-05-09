import { NgModule } from '@angular/core';

import { CdkDrag, CdkDropList, CdkDropListGroup } from '@angular/cdk/drag-drop';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule, Routes } from '@angular/router';
import { SideNavComponent } from './layout/side-nav/side-nav.component';
import { ToolbarComponent } from './layout/toolbar/toolbar.component';
import { MainCalendarComponent } from './main-calendar/main-calendar.component';
import { NewAppointmentComponent } from './new-appointment/new-appointment.component';
import { CommonModule } from '@angular/common';

const MAIN_ROUTES: Routes = [
  {
    path: '', component: SideNavComponent,
    children: [
      { path: '', redirectTo:'main', pathMatch:'full' },
      { path: 'main', component: MainCalendarComponent }
    ]
  }
];

@NgModule({
  declarations: [
    MainCalendarComponent,
    SideNavComponent,
    ToolbarComponent,
    NewAppointmentComponent
  ],
  imports: [
    RouterModule.forChild(MAIN_ROUTES),
    CommonModule,
    MatCardModule,
    ReactiveFormsModule,
    FormsModule,
    // MatButtonModule,
    // MatCardModule,
    // MatCheckboxModule,
    // MatChipsModule,
    MatDatepickerModule,
    MatDialogModule,
    // MatExpansionModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatMenuModule,
    MatListModule,
    // MatProgressBarModule,
    // MatProgressSpinnerModule,
    // MatRadioModule,
    // MatSelectModule,
    MatSidenavModule,
    // MatSlideToggleModule,
    MatSnackBarModule,
    // MatStepperModule,
    MatToolbarModule,
    MatButtonModule,
    // MatTooltipModule,
    MatNativeDateModule,
    CdkDropListGroup,
    CdkDropList,
    CdkDrag,
  ],
  providers: [],
})
export class SchedulerModule { }
