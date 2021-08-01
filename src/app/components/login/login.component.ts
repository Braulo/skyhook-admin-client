import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api/api.service';
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

  constructor(private apiService: ApiService, private router: Router) {}

  ngOnInit(): void {}

  login(email: string, password: string): void {
    this.apiService
      .post(`/auth/login/${environment.skyhookMasterApplicationId}`, {
        email,
        password,
      })
      .subscribe(
        (res) => {
          this.token = res as string;
          localStorage.setItem('token', res as string);
          if (this.token) {
            this.router.navigateByUrl('/realms');
          }
        },
        (err) => {
          // this.error = JSON.stringify(err, null, 2);
          // this.error = err.error || JSON.stringify(err, null, 2);
          this.error = JSON.stringify(err, null, 2);
          if (err.error.includes('Password') || err.error.includes('Email')) {
            return (this.error = err.error);
          }
        },
      );
  }
}
