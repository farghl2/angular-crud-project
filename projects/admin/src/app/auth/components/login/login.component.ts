import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginService } from '../../services/login.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm!:FormGroup;
  loginLoader:boolean = false;

  constructor(private fb:FormBuilder,
     private loginService: LoginService,
     private tostarService:ToastrService,
     private router:Router,
     private spinner:NgxSpinnerService
     ) { }

  ngOnInit(): void {
    this.creatForm();
  }

  creatForm(){
    this.loginForm = this.fb.group({
      email:['', [Validators.required, Validators.email]],
      password:['', [Validators.required, Validators.minLength(4), Validators.maxLength(20)]],
      role:['admin']
    })

  }

  login(){
    this.spinner.show();
    this.loginLoader = true;
    this.loginService.login(this.loginForm.value).subscribe((res:any)=>{
      localStorage.setItem('token',res.token)
      this.tostarService.success("success");
      this.spinner.hide();
      this.loginLoader = false;
      this.router.navigate(['/tasks']);

    },(error)=>{
      this.spinner.hide();
      this.loginLoader = false;
      this.tostarService.error(error.error.message);
    });




  }


}
