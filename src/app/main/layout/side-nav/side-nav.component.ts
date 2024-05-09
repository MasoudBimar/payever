import { Direction, Directionality } from '@angular/cdk/bidi';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, NgZone, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { ScreenService } from '../../services/screen.service';
import { SharedService } from '../../services/shared.service';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.css']
})
export class SideNavComponent implements OnInit, OnDestroy {
  selectedDate?: Date;
  dir: Direction = 'rtl';
  destroyed = new Subject<void>();
  currentScreenSize?: string;
  // Create a map to display breakpoint names for demonstration purposes.
  displayNameMap = new Map([
    [Breakpoints.XSmall, 'XSmall'],
    [Breakpoints.Small, 'Small'],
    [Breakpoints.Medium, 'Medium'],
    [Breakpoints.Large, 'Large'],
    [Breakpoints.XLarge, 'XLarge'],
  ]);
  constructor(
    zone: NgZone,
    private router: Router,
    public directionality: Directionality,
    public screenService: ScreenService,
    public sharedService: SharedService,
    breakpointObserver: BreakpointObserver) {
    this.selectedDate = this.sharedService.selectedDate.value;
    breakpointObserver
      .observe([
        Breakpoints.XSmall,
        Breakpoints.Small,
        Breakpoints.Medium,
        Breakpoints.Large,
        Breakpoints.XLarge,
      ])
      .pipe(takeUntil(this.destroyed))
      .subscribe(result => {
        for (const query of Object.keys(result.breakpoints)) {
          if (result.breakpoints[query]) {
            this.currentScreenSize = this.displayNameMap.get(query) ?? 'Unknown';
          }
        }
      });
    this.dir = directionality.value;
  }

  @ViewChild(MatSidenav) sidenav!: MatSidenav;

  toggleDir() {
    this.dir = this.dir == 'ltr' ? 'rtl' : 'ltr';
    this.screenService.dir.next(this.dir);
    this.sidenav.toggle().then(() => this.sidenav.toggle());
  }

  ngOnInit() {

    this.router.events.subscribe(() => {
      if (this.isScreenSmall())
        this.sidenav.close();
    })
  }

  isScreenSmall(): boolean {
    return this.currentScreenSize === 'Small' || this.currentScreenSize === 'XSmall';
  }

  onChangeDate(event: Date) {
    this.selectedDate = event;
    this.sharedService.selectedDate.next(event);
  }
  ngOnDestroy() {
    this.destroyed.next();
    this.destroyed.complete();
  }
  gotoToday() {
    this.onChangeDate(new Date());
  }

  gotoTomorrow() {
    const date = new Date((this.selectedDate ?? new Date()).toString());
    date.setDate(date.getDate() + 1);
    this.onChangeDate(date);
  }

  gotoYesterday() {
    const date = new Date((this.selectedDate ?? new Date()).toString());
    date.setDate(date.getDate() - 1);
    this.onChangeDate(date);
  }
}
