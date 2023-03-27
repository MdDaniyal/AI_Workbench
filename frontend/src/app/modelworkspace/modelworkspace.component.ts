import { Component } from '@angular/core';
import { UserService } from './user.service'
@Component({
  selector: 'app-modelworkspace',
  templateUrl: './modelworkspace.component.html',
  styleUrls: ['./modelworkspace.component.css']
})
export class ModelworkspaceComponent {
  show_part2: Boolean = false;
  listofdata: any;

  constructor(private user: UserService) {
    this.user.getData().subscribe(data => {
      this.listofdata = data
    });

  }

  proceed($event: any) {
    this.show_part2 = true;
  }
}
