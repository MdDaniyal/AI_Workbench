import { Component } from '@angular/core';
import { map } from 'rxjs/operators';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import data from '../../assets/datsets_api.json';
import { UsersService } from './users.service'
import { ViewChild, ElementRef } from '@angular/core';
@Component({
  selector: 'app-datasafe',
  templateUrl: './datasafe.component.html',
  styleUrls: ['./datasafe.component.css']
})
export class DatasafeComponent {
  datasets_source: any;
  file: File | null = null;

  constructor(private user: UsersService) {
    this.user.getData().subscribe(data => {
      this.datasets_source = data
    });

  }

  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol', 'user_id'];


  onFilechange(event: any) {
    // const files = event.target.files;
    this.file = event.target.files[0]
  }

  upload() {
    if (this.file) {
      this.user.uploadfile(this.file).subscribe(resp => {
        alert("File Uploaded")
      })
    } else {
      console.log("error")
    }
    this.refresh()
  }

  refresh() {
    console.log("refresh")
    this.user.getData().subscribe(data => {
      this.datasets_source = data
    });
  }


}
