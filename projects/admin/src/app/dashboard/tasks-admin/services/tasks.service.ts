import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment as env } from 'projects/admin/src/environments/environment';
import { Task } from '../../../models';

@Injectable({
  providedIn: 'root'
})
export class TasksService {

  constructor(private httpClient: HttpClient) { }


  getAllTasks(filter:any){
    let params = new HttpParams();
    Object.entries(filter).forEach(([key ,value]:any)  => {
      if(value){
        params = params.append(key, value);
      }

    })

    return this.httpClient.get(`${env.baseApi}/tasks/all-tasks`, {params});

  }

  addTask(data:any){
    return this.httpClient.post(`${env.baseApi}/tasks/add-task`, data);
  }

  deleteTask(id:any){
    return this.httpClient.delete(`${env.baseApi}/tasks/delete-task/`+id);
  }

  updateTask(data:any,id:string){
    return this.httpClient.put(`${env.baseApi}/tasks/edit-task/`+id,data)

  }
}
