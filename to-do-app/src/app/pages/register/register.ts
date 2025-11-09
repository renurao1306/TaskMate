import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-register',
  imports: [CommonModule, ReactiveFormsModule, FormsModule, RouterLink],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register implements OnInit {
  registerForm: any;

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      name: ['', [Validators.required]],
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
      contact: ['', [Validators.required, Validators.pattern(/^[0-9]{10}$/)]],
      email: ['', [Validators.required, Validators.pattern(/^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-.]+\.[a-zA-Z]{3,4}$/)]],
      dob: ['', [Validators.required, this.customDOBValidator]]
    });
  }

  customDOBValidator(control: any){
    const today = new Date();
    const dob = new Date(control.value);

    if(dob > today){
      return ({invalidDOB: true});
    } else {
      return null;
    }
  }

  onSubmit(){
    if(this.registerForm.valid){
      console.log(this.registerForm.value);
      
    }
  }

}
