import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import {HttpParams} from '@angular/common/http'
@Injectable({
  providedIn: 'root'
})
export class UserService {

  getDropdownurl:any = "http://localhost:5000/dataset_dropdown/";
  getColumnsurl:any = "http://localhost:5000/dataset_info/";
  postExpInfourl:any = "http://localhost:5000/upload_experiment_info/"
  constructor(private http:HttpClient) { }

  getDropdownData()
  {
    return this.http.get(this.getDropdownurl);
  }
  getColumnsData(dataid:any)
  {
    let queryParams = new HttpParams();
    queryParams = queryParams.append("dataid",dataid);
    return this.http.get(this.getColumnsurl,{params:queryParams});
  }
  
  postColumnsInfo(dataid:any, train_test_ratio:any, expname:any, problemtype:any,
    selectedModels:any, targetfeature:any, randstate:any, training_features:any)
  {
    const body = {
      expname: expname,
      dataid: dataid,
      problemtype: problemtype,
      selectedModels: selectedModels,
      training_features: training_features,
      targetfeature: targetfeature,
      train_test_ratio: train_test_ratio,
      randstate: randstate
    };
    return this.http.post(this.postExpInfourl,body);
  }

}
