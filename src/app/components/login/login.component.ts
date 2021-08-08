import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  public email: string = 'admin@skyhook.com';
  public password: string = 'admin';
  public message: string;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {}

  login(email: string, password: string): void {
    this.authService.login(email, password).subscribe(
      (res) => {
        localStorage.setItem('accessToken', res.accessToken);
        localStorage.setItem('refreshToken', res.refreshToken);
        if (res) {
          this.router.navigateByUrl('/realms');
        }
      },
      (err) => {
        this.authService.startAutoRefresh();
        this.message = err.error.message;
      },
    );
  }
}
