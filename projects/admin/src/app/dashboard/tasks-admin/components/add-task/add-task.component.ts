import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogRef,
} from '@angular/material/dialog';
import { TasksService } from '../../services/tasks.service';
import * as moment from 'moment';
import { ToastrService } from 'ngx-toastr';
import { ConfirmationComponent } from '../confirmation/confirmation.component';
import { UsersService } from '../../../manage-users/services/users.service';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.scss'],
})
export class AddTaskComponent implements OnInit {
  taskForm!: FormGroup;
  loadingTask: boolean = false;
  existData: any;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    public dialog: MatDialogRef<AddTaskComponent>,
    public matDialog: MatDialog,
    public tasksService: TasksService,
    private tostarService: ToastrService,
    private userService:UsersService
  ) {}

  users: any = [];
  ngOnInit(): void {
    this.creatFormTask();
    this.userService.user.subscribe((res:any)=>{
      this.users = res;
    })

  }

  creatFormTask() {
    this.taskForm = this.fb.group({
      title: [this.data?.title || '', Validators.required],
      image: [this.data?.image || '', Validators.required],
      userId: [this.data?.userId?._id || '', Validators.required],
      description: [this.data?.description || '', Validators.required],
      deadline: [
        this.data
          ? new Date(
              this.data.deadline.split('-').reverse().join('-')
            ).toISOString()
          : '',
        Validators.required,
      ],
    });

    this.existData = this.taskForm.value;
  }

  selectImage(event: any) {
    this.taskForm.get('image')?.setValue(event.target.files[0]);
  }

  creatTask() {
    this.loadingTask = true;
    let formData = this.preparFormData();
    this.tasksService.addTask(formData).subscribe(
      (res) => {
        this.tostarService.success('create task successfuly');
        this.loadingTask = false;
        this.dialog.close(true);
      },
      (error) => {
        this.tostarService.error(error.error.message);
        this.loadingTask = false;
      }
    );
  }

  preparFormData() {
    let newDate = moment(this.taskForm.value['deadline']).format('DD-MM-YYYY');
    let formData = new FormData();

    Object.entries(this.taskForm.value).forEach(([key, value]: any) => {
      if (key === 'deadline') {
        formData.append(key, newDate);
      } else {
        formData.append(key, value);
      }
    });

    return formData;
  }

  updateTask() {
    this.loadingTask = true;
    let formData = this.preparFormData();
    this.tasksService.updateTask(formData, this.data._id).subscribe(
      (res) => {
        this.tostarService.success('create task successfuly');
        this.loadingTask = false;
        this.dialog.close(true);
      },
      (error) => {
        this.tostarService.error(error.error.message);
        this.loadingTask = false;
      }
    );
  }

  onClose() {
    let detection = false;
    Object.keys(this.existData).forEach((key) => {
      if (this.existData[key] !== this.taskForm.value[key]) {
        detection = true;
      }
    });
    if (detection) {
      const dialogRef = this.matDialog.open(ConfirmationComponent, {
        width: '750px',
      });

      dialogRef.afterClosed().subscribe((result) => {
        if (result) {
        }
      });
    } else {
      this.dialog.close();
    }
  }
}
