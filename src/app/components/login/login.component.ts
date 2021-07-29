import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api/api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  public email: string = 'admin@skyhook.com';
  public password: string = 'admin';
  public errors: any;
  public token: string = '';

  constructor(public apiService: ApiService) {}

  ngOnInit(): void {}

  login(email: string, password: string): void {
    this.apiService
      .post('auth/login/1', {
        email,
        password,
      })
      .subscribe(
        (res) => {
          this.token= (res as string);
          console.log(res);
        },
        (err) => {
          this.errors = err.error;
          console.log('test', err);
        }
      );
  }
}
