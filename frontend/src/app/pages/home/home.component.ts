import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  formGroup!: FormGroup;

  protected formBuilder = inject(FormBuilder);
  protected userService = inject(UserService);
  
  constructor() {
    this.formGroup = this.formBuilder.group({
      username: '',
      email: '',
      password: ''
    });
  }

  submit(): void {
    this.userService.registerUser(this.formGroup.value)
      .subscribe(res => console.log(res));
  };
}
