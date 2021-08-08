import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UserService } from 'src/app/services/user/user.service';
import { User } from 'src/model/user.model';

@Component({
  selector: 'app-user-dialog',
  templateUrl: './user-dialog.component.html',
  styleUrls: ['./user-dialog.component.scss'],
})
export class UserDialogComponent implements OnInit {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { user: User },
    private formBuilder: FormBuilder,
    private dialog: MatDialog,
    private userService: UserService,
  ) {}

  userForm = this.formBuilder.group({
    username: new FormControl('', [Validators.required]),
  });

  ngOnInit(): void {
    this.userForm.get('username').setValue(this.data?.user?.username);
  }

  getErrorMessage() {
    if (this.userForm.get('username').hasError('required')) {
      return 'You must enter a value';
    }
    return '';
  }

  onSubmit() {
    this.dialog.closeAll();
    this.data.user.username = this.userForm.get('username').value;
    this.userService.updateUser(this.data.user).subscribe();
  }
}
