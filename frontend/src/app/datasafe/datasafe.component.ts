import { Component } from '@angular/core';
import { map } from 'rxjs/operators';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import data from '../../assets/datsets_api.json';
import {UsersService} from './users.service'
import { ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-datasafe',
  templateUrl: './datasafe.component.html',
  styleUrls: ['./datasafe.component.css']
})
export class DatasafeComponent{
  datasets_source: any;

    constructor(private user:UsersService){
      this.user.getData().subscribe(data=>{
        this.datasets_source=data
      });
    }
    
    displayedColumns: string[] = ['position', 'name', 'weight', 'symbol','user_id'];

    @ViewChild('fileInput') fileInput!: ElementRef;
  fileAttr = 'Choose File';
  uploadFileEvt(imgFile: any) {
    if (imgFile.target.files && imgFile.target.files[0]) {
      this.fileAttr = '';
      Array.from(imgFile.target.files).forEach((file: any) => {
        this.fileAttr += file.name + ' - ';
      });
      // HTML5 FileReader API
      let reader = new FileReader();
      reader.onload = (e: any) => {
        let image = new Image();
        image.src = e.target.result;
        image.onload = (rs) => {
          let imgBase64Path = e.target.result;
        };
      };
      reader.readAsDataURL(imgFile.target.files[0]);
      // Reset if duplicate image uploaded again
      this.fileInput.nativeElement.value = '';
    } else {
      this.fileAttr = 'Choose File';
    }
  }
}
