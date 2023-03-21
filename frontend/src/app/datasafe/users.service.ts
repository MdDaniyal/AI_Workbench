import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
@Injectable({
  providedIn: 'root'
})
export class UsersService {
  geturl:any = "http://localhost:5000/datasets/";
  posturl:any = "http://localhost:5000/upload_data/";
  constructor(private http:HttpClient) { }

  getData()
  {
    return this.http.get(this.geturl);

  }

  public uploadfile(file: File) {
    let formParams = new FormData();
    formParams.append('file', file)
    return this.http.post(this.posturl, formParams)
  }

}
