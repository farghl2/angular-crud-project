import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment as env } from 'projects/admin/src/environments/environment';
import { Task } from '../../../models';

@Injectable({
  providedIn: 'root'
})
export class TasksService {

  constructor(private httpClient: HttpClient) { }


  getAllTasks(){
    return this.httpClient.get(`${env.baseApi}/tasks/all-tasks`);

  }

  addTask(data:any){
    return this.httpClient.post(`${env.baseApi}/tasks/addTask`, data);
  }
}
