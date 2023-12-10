import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { LoginService } from '../../services/login.service';
import { Router } from '@angular/router';
export const StrongPasswordRegx: RegExp =
/^(?=[^A-Z]*[A-Z])(?=[^a-z]*[a-z])(?=\D*\d).{8,}$/;
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  registerForm!:FormGroup;

  constructor(private formBuilder:FormBuilder,
     private loginService:LoginService,
     private router:Router) { }

  ngOnInit(): void {
    this.creatRegisterForm()
  }

  creatRegisterForm(){
    this.registerForm = this.formBuilder.group({
      username: ['',[Validators.required,Validators.minLength(6)]],
      email:['',[Validators.required, Validators.email]],
      password:['',[Validators.required, Validators.pattern(StrongPasswordRegx)]],
      confirmPassword:['',[Validators.required, Validators.pattern(StrongPasswordRegx)],],
      role:['user']
    },{validators:this.checkPass})
  }

  checkPass:ValidatorFn = (group:AbstractControl):ValidationErrors | null =>{
    let pass =group.get('password')?.value;
    let confirmPass =group.get('confimPassword')?.value;
    return  confirmPass === pass? null: {notSame:true}
  }

  creatAccount(){
    console.log(this.registerForm)
    this.loginService.creatAccount(this.registerForm.value).subscribe((res)=>{
      localStorage.setItem('token',res.token)
      this.router.navigate(['/tasks'])
      console.log(res);
    })
  }

}
