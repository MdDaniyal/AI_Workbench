import { Component } from '@angular/core';
import { UserexpService } from './userexp.service'
import {FormBuilder} from '@angular/forms';
@Component({
  selector: 'app-exp-summary',
  templateUrl: './exp-summary.component.html',
  styleUrls: ['./exp-summary.component.css']
})
export class ExpSummaryComponent {

  show: Boolean = false;
  dicon: Boolean = true;
  cicon: Boolean = false;

  experiments_info: any;
  chosenExperiment: any;
  selected_experiment: any;
  selectedExperimentInfo: any;
  model: any;
  selectedModel: any;
  selectedModelName: any;

  constructor(private user: UserexpService, private _formBuilder: FormBuilder) {
    this.user.getExperimentsData().subscribe(data => {
      this.experiments_info = data;
    });
  }

  displayedColumn_chooseExperiment: string[] = ['experiment_name', 'model_type', 'created_on', 'experiment_status', 'select'];
  displayedColumn_experimentInfo: string[] = ['model_name', 'accuracy_score', 'select_model'];

  selected_exp()
  {
    this.show = true;
    this.user.getExperimentsInfo(this.selected_experiment).subscribe(data => {
      this.selectedExperimentInfo = data;
    });
  }

  download(element: any) {
    this.selectedModel = element.model_id;
    this.selectedModelName = element.modelNames;
    element.downloaded = 1;
    this.user.getModel(this.selectedModel)
  .subscribe({
    next: (response: any) => { // Specify the type of response as 'any'
      const blob = new Blob([response], { type: 'application/octet-stream' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      let filename: string = '';
      let mid: string = this.selectedModel.toString();
      filename = filename + this.selectedModelName + mid + '.pickle'; 
      a.download = filename; // or set a custom filename if needed
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
      this.cicon = true;
    },
    error: (error) => {
      console.error('Download failed:', error);
    }
  });
  }
  

}
