import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink, } from '@angular/router';
import { UserService } from '../../services/userService/user-service';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-register',
  imports: [CommonModule, ReactiveFormsModule, FormsModule, RouterLink, HttpClientModule],
  standalone: true,
  providers: [UserService],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register implements OnInit {
  registerForm: any;

  constructor(private fb: FormBuilder, private userService: UserService, private router: Router) { }

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

  customDOBValidator(control: any) {
    const today = new Date();
    const dob = new Date(control.value);

    if (dob > today) {
      return ({ invalidDOB: true });
    } else {
      return null;
    }
  }

  onSubmit() {
    if (this.registerForm.valid) {
      console.log(this.registerForm.value);

      this.userService.registerUser(this.registerForm.value).subscribe({
        next: (res) => {
          console.log('Result after registering user: ', res)
          localStorage.setItem('token', res.token)

          this.router.navigate(['/home']);
        },
        error: (err) => {
          console.log('Error while resgistering user: ', err)
        }
      });
    }
  }

}
