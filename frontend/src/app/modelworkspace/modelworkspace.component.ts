import { Component } from '@angular/core';

@Component({
  selector: 'app-modelworkspace',
  templateUrl: './modelworkspace.component.html',
  styleUrls: ['./modelworkspace.component.css']
})
export class ModelworkspaceComponent {
  show_part2: Boolean = false;
  listofdata: any[] = [
    {
      "dataid": 1,
      "dataname": "Iris.csv"
    },
    {
      "dataid": 2,
      "dataname": "Wine.csv"
    },
    {
      "dataid": 3,
      "dataname": "Iris.csv"
    },
    {
      "dataid": 4,
      "dataname": "gfg.csv"
    }
  ];
  proceed($event: any) {
    this.show_part2 = true;
  }
}
