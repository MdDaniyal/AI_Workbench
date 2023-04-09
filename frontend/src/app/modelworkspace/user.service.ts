import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import {HttpParams} from '@angular/common/http'
@Injectable({
  providedIn: 'root'
})
export class UserService {



  getDropdownurl:any = "http://localhost:5000/dataset_dropdown/";
  getColumnsurl:any = "http://localhost:5000/dataset_info/";
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
}
