import { Component, inject } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [],
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss'
})
export class UserComponent {
  formGroup!: FormGroup;
  username: string | null = localStorage.getItem('username');
  email: string | null = localStorage.getItem('email');
  showModal: boolean = false;

  private formBuilder = inject(FormBuilder);
  private userService = inject(UserService);
  private router = inject(Router);

  constructor() {
    this.formGroup = this.formBuilder.group({
      userrname: '',
      email: '',
      password: ''
    });
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    localStorage.removeItem('email');
    
    this.router.navigate(['/register']);
  }

  modalControl(): void {
    this.showModal = !this.showModal;
  }

  editUser(): void {
    console.log('editUser');
  }
}
