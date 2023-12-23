import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment as env } from 'projects/admin/src/environments/environment';
import { BehaviorSubject, Subject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class UsersService {
  user:any = new BehaviorSubject(null);
  constructor(private httpClient:HttpClient) { }

  getAllUsers(){
    return this.httpClient.get(`${env.baseApi}/auth/users`)
  }

  deleteUser(userId:any){
    return this.httpClient.delete( `${env.baseApi}/auth/user/${userId}`)

  }
}
