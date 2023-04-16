import { Component } from '@angular/core';
import { UserService } from './user.service'
import { FormControl } from "@angular/forms";
import { Validators } from "@angular/forms";
import listOfMOdels from '../../assets/models.json';
import data from '../../assets/datsets_api.json';
import {FormBuilder} from '@angular/forms';

@Component({
  selector: 'app-modelworkspace',
  templateUrl: './modelworkspace.component.html',
  styleUrls: ['./modelworkspace.component.css']
})
export class ModelworkspaceComponent {
  show_part2: Boolean = false;
  show_part3: Boolean = false;
  listofdata: any;
  selectedModelType: any;

  constructor(private user: UserService, private _formBuilder: FormBuilder) {
    this.user.getDropdownData().subscribe(data => {
      this.listofdata = data
    });
  }
  
  displayedColumn: string[] = ['column_name', 'column_type', 'training_features', 'target_feature'];

  selectedModels: any;
  expName: any;
  columns: any;
  chosenDataset: any;
  chosenType: any;
  modelList: any;
  columns_form:any;
  selected_target_feature:any;
  columns_info_table:any;
  checkbox_bool_table:any;
  train_test_split_ratio=0.7;
  randState=42;


  isTarget(element:any, index:any, array:any) { 
    return (!element.checkbox_val); 
 } 
  proceed1($event: any) {
    this.show_part2 = true;
    this.user.getColumnsData(this.chosenDataset).subscribe(data => {
      this.columns = data;
      console.log(this.columns); // Move this line inside the callback
      this.columns_info_table = this.columns.column_info;
      this.checkbox_bool_table = this.columns.checkbox_info;
      this.selected_target_feature = this.columns_info_table.filter(this.isTarget)[0].Column_Name;
      this.columns_form = this._formBuilder.group(this.checkbox_bool_table);
    });
    
    
  }
  proceed2($event: any) {
    this.show_part3 = true;
  }

  submit(event: any) {
    console.log(this.selected_target_feature)
    
    console.log(this.columns_form.value)
    console.log(this.train_test_split_ratio)
  }

  mtype() {
    console.log(this.chosenType)
    if (this.chosenType == "classification") {
      this.modelList = listOfMOdels.Classification
    }
    else {
      this.modelList = listOfMOdels.Regression
    }
  }

  onTargetFeatureSelection(){
    
    this.columns_form.get(this.selected_target_feature).setValue(false);
  }
  previousCheck(){
    let temp=this.selected_target_feature;
    console.log(this.columns_form.controls[temp].value);
    this.columns_form.get(temp).setValue(!this.columns_form.controls[temp].value);
  }
}
