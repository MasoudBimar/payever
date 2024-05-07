import { EventEmitter, Injectable, Output } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ScreenService {

  dir: BehaviorSubject<string> = new BehaviorSubject('rtl');
  @Output() changed = new EventEmitter();

  constructor(private breakpointObserver: BreakpointObserver) {
    this.breakpointObserver
      .observe([Breakpoints.XSmall, Breakpoints.Small, Breakpoints.Medium, Breakpoints.Large])
      .subscribe(() => this.changed.next(true));
  }

  private isLargeScreen(): boolean {
    const isLarge = this.breakpointObserver.isMatched(Breakpoints.Large);
    const isXLarge = this.breakpointObserver.isMatched(Breakpoints.XLarge);

    return isLarge || isXLarge;
  }

  public get sizes(): Record<string, boolean> {
    return {
      'screen-x-small': this.breakpointObserver.isMatched(Breakpoints.XSmall),
      'screen-small': this.breakpointObserver.isMatched(Breakpoints.Small),
      'screen-medium': this.breakpointObserver.isMatched(Breakpoints.Medium),
      'screen-large': this.isLargeScreen(),
    };
  }
}
