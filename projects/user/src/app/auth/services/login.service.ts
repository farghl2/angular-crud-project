import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CreatAccount } from '../models';
import { Observable } from 'rxjs';
import {environment as env} from '../../../environments/environment'
@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private httpClient:HttpClient) { }

  creatAccount(data:CreatAccount):Observable<any>{
    return this.httpClient.post<any>(`${env.baseApi}/auth/createAccount`, data)

  }

  login(data:{email:string,password:string,role:string}):Observable<any>{
    return this.httpClient.post<any>(`${env.baseApi}/auth/login`, data);

  }
}
