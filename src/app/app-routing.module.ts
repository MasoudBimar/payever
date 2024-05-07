import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SideNavComponent } from './layout/side-nav/side-nav.component';
import { MainCalendarComponent } from './main-calendar/main-calendar.component';

const routes: Routes = [
  {
    path: '', component: SideNavComponent,
    children: [
      { path: '', component: MainCalendarComponent }
    ]
  },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
