import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api/api.service';
import { AuthService } from 'src/app/services/auth/auth/auth.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  public email: string = 'admin@skyhook.com';
  public password: string = 'admin';
  public error: string;
  public token: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {}

  login(email: string, password: string): void {
    this.authService.login(email, password).subscribe(
      (res) => {
        localStorage.setItem('token', res as string);
        if (res) {
          this.token = res as string;
          this.router.navigateByUrl('/realms');
        }
      },
      (err) => {
        this.error = err;
      },
    );
  }
}
