import { Component } from '@angular/core';
import { map } from 'rxjs/operators';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';

@Component({
  selector: 'app-datasafe',
  templateUrl: './datasafe.component.html',
  styleUrls: ['./datasafe.component.css']
})
export class DatasafeComponent {
  /** Based on the screen size, switch from standard to one column per row */
  cards = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
    map(({ matches }) => {
      if (matches) {
        return [
          { title: 'Upload Dataset', cols: 1, rows: 1 },
          { title: 'Datasets Info', cols: 1, rows: 2 }
        ];
      }

      return [
        { title: 'Upload Dataset', cols: 1, rows: 1 },
        { title: 'Datasets Info', cols: 1, rows: 2 }
      ];
    })
  );

  constructor(private breakpointObserver: BreakpointObserver) {}
}