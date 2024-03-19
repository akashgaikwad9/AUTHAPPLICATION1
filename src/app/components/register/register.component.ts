import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { passwordMatchValidator } from '../../shared/password-match.directive';
import { AuthService } from '../../services/auth.service';
import { response } from 'express';
import { Router } from '@angular/router';
import { error } from 'console';
import { User } from '../../interfaces/auth';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  registerForm = this.fb.group({

    fullName: ['', [Validators.required, Validators.pattern(/^[a-zA-Z]+(?: [a-zA-Z]+)*$/)]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
    confirmPassword: ['', Validators.required]
  }, 
  {
    validators: passwordMatchValidator 
  }
  
  )

  constructor(
    private fb: FormBuilder, 
    private authService: AuthService, 
    private messageService: MessageService,
    private router: Router
    ) { }

  get email() {
    return this.registerForm.controls['email'];
  }

  get password() {
    return this.registerForm.controls['password'];
  }

  get fullName() {
    return this.registerForm.controls['fullName'];
  }

  get confirmPassword() {
    return this.registerForm.controls['confirmPassword'];
  }

  submitDetails(){
    const postData = {...this.registerForm.value};
    delete postData.confirmPassword;

    this.authService.registerUser(postData as User).subscribe(
      response => {
        console.log(response)
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'User registered successfully' });
        this.router.navigate(['login'])
      
      },
      error => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Something went wrong' });

      }
      
      
    )
    
  }

}
