import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  formGroup!: FormGroup;

  private formBuilder = inject(FormBuilder);
  private userService = inject(UserService);
  private router = inject(Router);
  
  constructor() {
    this.formGroup = this.formBuilder.group({
      username: '',
      email: '',
      password: ''
    });
  }

  submit(): void {
    this.userService.registerUser(this.formGroup.value)
      .subscribe({
        next: res => {
          localStorage.setItem('token', res.token);
          localStorage.setItem('username', res.user.username);
          localStorage.setItem('email', res.user.email);

          this.userService.setUserLoggedIn();

          this.router.navigate([res.user.username]);
        },
        error: res => {
          console.log(res.error.message)
        }
      });
  };
}
