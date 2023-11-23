import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { TasksService } from '../../services/tasks.service';
import * as moment from 'moment';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.scss']
})
export class AddTaskComponent implements OnInit {
  taskForm!:FormGroup;
  constructor(
    private fb:FormBuilder ,
     public dialog: MatDialogRef<AddTaskComponent> ,
      public matDialog:MatDialog,
      public tasksService:TasksService
      ) { }

  users:any = [
    {name:"Moahmed" , id:1},
    {name:"Ali" , id:2},
    {name:"Ahmed" , id:3},
    {name:"Zain" , id:4},
  ]
  ngOnInit(): void {
    this.creatFormTask();
  }

  creatFormTask(){
    this.taskForm = this.fb.group({
      title:['',Validators.required],
      image:['',Validators.required],
      userId:['',Validators.required],
      description:['',Validators.required],
      deadline:['',Validators.required],
    })
  }

  selectImage(event:any){
    this.taskForm.get('image')?.setValue(event.target.files[0]);
  }

  creatTask(){

    let formData = this.preparFormData();
    this.tasksService.addTask(formData).subscribe((res)=>{
      this.dialog.close()

    },(error)=>{
      console.log(error.error.message);
    })

  }

  preparFormData(){
    let newDate =moment(this.taskForm.value['deadline']).format('DD-MM-YYYY')
    let formData = new FormData();
    Object.entries((this.taskForm.value).forEach(([key, value]:any) => {
        (key === 'deadline')?formData.append(key, newDate):formData.append(key, value);
        // formData.append(key, value);
    }))

    return formData;
  }

  onClose(){
    this.dialog.close();
  }

}
