import { CanActivateFn } from '@angular/router';
import { UserService } from '../services/user.service';
import { inject } from '@angular/core';

export const userGuard: CanActivateFn = (route, state) => {
  const userService = inject(UserService);

  return userService.getUserLoggedIn();
};
