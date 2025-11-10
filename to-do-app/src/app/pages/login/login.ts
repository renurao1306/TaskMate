import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { UserService } from '../../services/userService/user-service';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-login',
  imports: [CommonModule, ReactiveFormsModule, FormsModule, RouterLink, HttpClientModule],
  providers: [UserService],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login implements OnInit {
  loginForm: any;

  constructor(private fb: FormBuilder, private userService: UserService, private router: Router) { }
  ngOnInit(): void {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });
  }

  onSubmit(){
    if(this.loginForm.valid){
      console.log(this.loginForm.value);
      
      this.userService.loginUser(this.loginForm.value).subscribe({
        next: (res) => {
          console.log('Result after login user: ', res);
          localStorage.setItem('token', res.token);

          this.router.navigate(['/home']);
        },
        error: (err) => {
          console.log('Error while login user: ', err);
          alert(err.message)
        }
      })
    }
  }
}
