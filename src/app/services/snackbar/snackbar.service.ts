import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class SnackbarService {
  duration: number = 2000;
  constructor(private snackbar: MatSnackBar) {}

  openSnackbar(content: string, action: string) {
    this.snackbar.open(content, action, {
      duration: this.duration,
    });
  }
}
