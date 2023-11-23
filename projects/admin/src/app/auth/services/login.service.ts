import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Login } from '../../models';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  mainUrl:string = 'https://crud-aqlv.onrender.com'

  constructor(private httpClient:HttpClient) { }

  login(data:Login){
    return this.httpClient.post(`${this.mainUrl}/auth/login`,data);
  }
}
