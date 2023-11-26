import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { AddTaskComponent } from '../add-task/add-task.component';
import { TasksService } from '../../services/tasks.service';
import { Dialog } from '@angular/cdk/dialog';
import { retry } from 'rxjs';

import { environment as env } from 'projects/admin/src/environments/environment';
export interface PeriodicElement {
  title: string;
  user: string;
  deadLineDate: string;
  status: string;
}


@Component({
  selector: 'app-list-tasks',
  templateUrl: './list-tasks.component.html',
  styleUrls: ['./list-tasks.component.scss']
})
export class ListTasksComponent implements OnInit {
  displayedColumns: string[] = ['position', 'title', 'user' ,'deadline','status', 'actions'];
  dataSource:any = [];
  tasksFilter!:FormGroup
  filteration:any ={}
  timeOutId:any;
  users:any = [
    { name: 'Moahmed', id: '65626af4359c4022bf6ba53b' },
    { name: 'Ali', id: '6562789c8f24e2dd6d4264b3' },
  ]

  status:any = [
    {name:"Complete" , id:1},
    {name:"In-Prossing" , id:2},
    {name:"In-Progress",id:3}
  ]
  baseApi = env.baseApi +"/";
  constructor(
    public dialog: MatDialog ,
    private fb:FormBuilder,
    private tasksService: TasksService,

    ) { }

  ngOnInit(): void {
    this.createform()
    this.getAllTasks();
  }

  createform() {
    this.tasksFilter = this.fb.group({
      title:[''],
      userId:[''],
      fromDate:[''],
      toDate:['']
    })
  }

  search(event:any){

    this.filteration['keyword'] = event.value;
    clearTimeout(this.timeOutId);
    this.timeOutId = setTimeout(()=>{
      this.getAllTasks();

    },2000)
  }

  selectedUser(event:any){
    this.filteration['userId'] = event.value;
    this.getAllTasks();
  }

  selectedStatus(event:any){
    this.filteration['status'] = event.value;
    this.getAllTasks();
  }
  getAllTasks() {
    this.tasksService.getAllTasks(this.filteration).subscribe((res:any)=>{
      console.log(res)
      this.dataSource = this.mappingTasks(res.tasks);
    })

  }

  mappingTasks(data:any){
    let tasks = data.map((item:any)=>{
      return {
        ...item,
        user:item.userId.username
      }


    })

    return tasks

  }
  addTask() {
      const dialogRef = this.dialog.open(AddTaskComponent, {
        width: '750px',
        disableClose:true
      });

      dialogRef.afterClosed().subscribe(result => {

        if(result) {
          this.getAllTasks()
        }
      })
  }
  onDeleteTask(id:any){

    this.tasksService.deleteTask(id).subscribe((res)=>{
      this.getAllTasks()
      console.log(res);
    })

  }

  onUpdateTask(element:any){
    const dialogRef = this.dialog.open(AddTaskComponent, {
      width: '750px',
      data:element
    });

    dialogRef.afterClosed().subscribe(result => {

      if(result) {
        this.getAllTasks()
      }
    })
  }


}
