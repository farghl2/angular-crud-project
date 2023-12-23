import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { UsersService } from '../../services/users.service';
import { NgxSpinner, NgxSpinnerService } from 'ngx-spinner';
export interface PeriodicElement {
  name: string;
  email: string;
  tasksAssigned: string;
}

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  displayedColumns: string[] = ['position', 'name', 'email' ,'tasksAssigned', 'actions'];
  dataSource = [];
  constructor(private userService:UsersService, private spinner:NgxSpinnerService) { }

  ngOnInit(): void {
    this.spinner.show();
    this.userService.user.subscribe((res:any)=>{
      this.dataSource = res;
      this.spinner.hide()

    })

  }

    deleteUser(user:any){
      if(user.assignedTasks === 0){

        this.userService.deleteUser(user._id).subscribe((res)=>{
          console.log(res);
        })
      }else {console.log("the user have tasks")}
    }



}
