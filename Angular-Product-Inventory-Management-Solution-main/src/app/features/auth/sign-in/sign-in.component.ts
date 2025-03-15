import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/auth.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent {
  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router) { }

  onLogin(form: any): void {
    if (form.valid) {
      this.authService.login(form.value.email, form.value.password).subscribe(
        (isAuthenticated) => {
          if (isAuthenticated) {
            this.errorMessage = '';
            this.router.navigate(['/inventory']);
          } else {
            this.errorMessage = 'Invalid email or password. Please try again.';
          }
        },
        (error) => {
          this.errorMessage = 'An error occurred during login. Please try again.';
          console.error(error);
        }
      );
    } else {
      this.errorMessage = 'Please fill out all required fields.';
    }
  }
}
