import { Component } from '@angular/core';
import { UserService } from './user.service'
import { FormControl } from "@angular/forms";
import { Validators } from "@angular/forms";
import listOfMOdels from '../../assets/models.json';


@Component({
  selector: 'app-modelworkspace',
  templateUrl: './modelworkspace.component.html',
  styleUrls: ['./modelworkspace.component.css']
})
export class ModelworkspaceComponent {
  show_part2: Boolean = false;
  listofdata: any;
  selectedModelType: any;


  constructor(private user: UserService) {
    this.user.getData().subscribe(data => {
      this.listofdata = data
    });

  }
// { Classification: { value: string; model: string; }[]; Regression: { value: string; model: string; }[]; }
  
  selectedModels:any;
  expName:any;
  chosenDataset:any;
  chosenType:any;
  modelList :any;
  proceed($event: any) {
    this.show_part2 = true;
    console.log(this.selectedModels)
    console.log(this.chosenDataset)
    console.log(this.chosenType)
    console.log(this.expName)
  }

  mtype(){
    console.log(this.chosenType)
    if (this.chosenType == "classification")
    {
      this.modelList = listOfMOdels.Classification
    }
    else
    {
      this.modelList = listOfMOdels.Regression
    }
  }
}
