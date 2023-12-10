import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginService } from '../../services/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm!:FormGroup;

  constructor(private formBuilder:FormBuilder,
    private loginService:LoginService,
    private router:Router) { }

  ngOnInit(): void {
    this.createLoginForm()
  }

  createLoginForm(){
    this.loginForm = this.formBuilder.group({
      email:['',[Validators.required,Validators.email]],
      password:['',[Validators.required,Validators.minLength(2)]],
      role:['user']
    })
  }

  login(){
    this.loginService.login(this.loginForm.value).subscribe((res)=>{
      this.router.navigate(['/tasks'])
      console.log(res);
    })
  }


}
