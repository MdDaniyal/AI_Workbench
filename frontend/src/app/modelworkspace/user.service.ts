import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
@Injectable({
  providedIn: 'root'
})
export class UserService {
  geturl:any = "http://localhost:5000/dataset_dropdown/";
  constructor(private http:HttpClient) { }

  getData()
  {
    return this.http.get(this.geturl);
  }
}
