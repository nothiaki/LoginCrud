import { Component } from '@angular/core';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [],
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss'
})
export class UserComponent {
  username: string | null = localStorage.getItem('username');
  email: string | null = localStorage.getItem('email');
}
