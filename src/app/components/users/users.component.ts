import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { SnackbarService } from 'src/app/services/snackbar/snackbar.service';
import { UserService } from 'src/app/services/user/user.service';
import { User } from 'src/model/user.model';
import { RealmUserRolesDialogComponent } from '../dialogs/realm-user-roles-dialog/realm-user-roles-dialog.component';
import { UserDialogComponent } from '../dialogs/user-dialog/user-dialog.component';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService,
    private dialog: MatDialog,
    private snackbarService: SnackbarService,
  ) {}

  userColums: string[] = ['id', 'email', 'username', 'emailConfirmed', 'realmRoles', 'realmApplications', 'actions'];
  userData: User[];
  realmId: string;
  username: string;
  email: string;

  ngOnInit(): void {
    this.realmId = this.route.snapshot.params.realmId;
    this.userService.getAllUsersByRealmId(this.realmId).subscribe((res) => {
      this.userData = res;
    });
    this.username = localStorage.getItem('username');
    this.email = localStorage.getItem('email');
  }

  navigateToRealms() {
    this.router.navigateByUrl('/realms');
  }
  openAddRealmRoleToUserDialog(user: User) {
    this.dialog
      .open(RealmUserRolesDialogComponent, {
        data: { realmId: this.realmId, user },
      })
      .afterClosed()
      .subscribe(() => {
        this.ngOnInit();
      });
  }

  logoutUser(user: User) {
    console.log(user);
    this.userService.logoutUserById(user.id).subscribe(
      (res) => {
        this.snackbarService.openSnackbar(`Logout success for ${user.username}`, 'POG');
      },
      (err) => {
        this.snackbarService.openSnackbar(`Logout Err${err.error.message}`, 'YIKES');
      },
    );
  }

  banUser(user: User) {
    this.userService.banUserById(user.id).subscribe(
      () => {
        this.snackbarService.openSnackbar(`Ban success for ${user.username}`, 'POG');
        this.ngOnInit();
      },
      (err) => {
        this.snackbarService.openSnackbar(`Ban err ${err.error.message}`, 'YIKES');
      },
    );
  }

  unbanUser(user: User) {
    this.userService.unbanUserById(user.id).subscribe(
      () => {
        this.snackbarService.openSnackbar(`Unban success for ${user.username}`, 'POG');
        this.ngOnInit();
      },
      (err) => {
        this.snackbarService.openSnackbar(`Unban err ${err.error.message}`, 'YIKES');
      },
    );
  }

  openEditUserModal(user: User) {
    this.dialog
      .open(UserDialogComponent, {
        data: {
          user: user,
        },
      })
      .afterClosed()
      .subscribe(() => {
        this.ngOnInit();
      });
  }
}
