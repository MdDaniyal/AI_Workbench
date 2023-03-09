import { Component } from '@angular/core';
import { map } from 'rxjs/operators';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import data from '../../assets/datsets_api.json';


@Component({
  selector: 'app-datasafe',
  templateUrl: './datasafe.component.html',
  styleUrls: ['./datasafe.component.css']
})
export class DatasafeComponent {
  datasets_source=data
  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol','user_id'];
  constructor(private breakpointObserver: BreakpointObserver) {}
}
