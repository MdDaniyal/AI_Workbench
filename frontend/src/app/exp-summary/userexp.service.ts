import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import {HttpParams} from '@angular/common/http'
@Injectable({
  providedIn: 'root'
})
export class UserexpService {
  getExpurl:any = "http://localhost:5000/choose_experiment/";
  getExpInfourl:any = "http://localhost:5000/experiment_info/";
  getModelurl:any = "http://localhost:5000/download_model/"
  constructor(private http:HttpClient) { }

  getExperimentsData()
  {
    return this.http.get(this.getExpurl);
  }
  getExperimentsInfo(expid: any)
  {
    let queryParams = new HttpParams();
    queryParams = queryParams.append("expid",expid);
    return this.http.get(this.getExpInfourl,{params:queryParams});
  }
  getModel(modid: any)
  {
    let queryParams = new HttpParams();
    queryParams = queryParams.append("modid",modid);
    return this.http.get(this.getModelurl,{params:queryParams,responseType: 'blob'});
  }
}
