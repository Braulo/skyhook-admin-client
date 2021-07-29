import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api/api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  public email: string = '';
  public password: string = '';

  constructor(public apiService: ApiService) {}

  ngOnInit(): void {}

  login(email: string, password: string): void {
    console.log(email, password);

    this.apiService
      .post('auth/login/41cb293c-22f9-4ebc-877c-c3cb030faeeb', {
        email,
        password,
      })
      .subscribe(
        (res) => {
          console.log(res);
        },
        (err) => {
          console.log(err);
        }
      );
  }
}
