import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  formGroup!: FormGroup;
  errorMessage!: string;
  errorControl: boolean = false;

  private formBuilder = inject(FormBuilder);
  private userService = inject(UserService);
  private router = inject(Router);
  
  constructor() {
    this.formGroup = this.formBuilder.group({
      email: '',
      password: ''
    });
  }

  submit(): void {
    this.userService.loginUser(this.formGroup.value)
      .subscribe({
        next: res => {
          localStorage.setItem('token', res.token);
          localStorage.setItem('username', res.user.username);
          localStorage.setItem('email', res.user.email);

          this.userService.setUserLoggedIn();

          this.router.navigate([res.user.username]);
        },
        error: res => {
          this.errorControl = true;
          this.errorMessage = res.error.message;
        }
      });
  };
}
