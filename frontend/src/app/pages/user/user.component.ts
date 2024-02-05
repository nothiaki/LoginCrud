import { Component, inject } from '@angular/core';
import { FormGroup, FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss'
})
export class UserComponent {
  formGroup!: FormGroup;
  username: string | null = localStorage.getItem('username');
  email: string | null = localStorage.getItem('email');
  token: string | null = localStorage.getItem('token');
  showModal: boolean = false;

  private formBuilder = inject(FormBuilder);
  private userService = inject(UserService);
  private router = inject(Router);

  constructor() {
    this.formGroup = this.formBuilder.group({
      username: '',
      email: '',
      password: ''
    });
  };

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    localStorage.removeItem('email');
    
    this.router.navigate(['/register']);
  };

  modalControl(): void {
    this.showModal = !this.showModal;
  };

  editUser(): void {
    this.formGroup.value.token = this.token;
    this.userService.editUser(this.formGroup.value, this.username)
      .subscribe({
        next: res => {
          console.log(res);
          this.logout();
        },
        error: res => {
          console.log(res.error.message);
        }
      })
  };

  delete(): void {
    this.userService.deleteUser(this.username, this.token)
      .subscribe({
        next: () => {
          this.logout();
        },
        error: res => {
          console.log(res);
        }
      })
  };
}
