import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './services/auth/auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'skyhook-admin-client';
  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    this.authService.refreshAccessToken().subscribe(
      (res) => {
        localStorage.setItem('accessToken', res);
        this.router.navigateByUrl(location.pathname);
        this.authService.startAutoRefresh();
      },
      () => {
        this.router.navigateByUrl('/login');
      },
    );
  }
}
