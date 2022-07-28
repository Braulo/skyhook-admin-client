import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthSkyhookFrontendService } from 'src/app/services/auth/auth-skyhook-frontend/auth-skyhook-frontend.service';
import { AuthService } from 'src/app/services/auth/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  public email: string = 'admin@skyhook.de';
  public password: string = '';
  public message: string;

  constructor(
    private authService: AuthService,
    private router: Router,
    private authServiceSkyhookFrontend: AuthSkyhookFrontendService,
  ) {}

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

  loginWithSkyhookFrontend(): void {
    this.authServiceSkyhookFrontend.login();
  }
}
