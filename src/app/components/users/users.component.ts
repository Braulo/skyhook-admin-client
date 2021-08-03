import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/services/user/user.service';
import { User } from 'src/model/user.model';
import { RealmUserRolesDialogComponent } from '../dialogs/realm-user-roles-dialog/realm-user-roles-dialog.component';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent implements OnInit {
  constructor(private route: ActivatedRoute, private userService: UserService, private dialog: MatDialog) {}

  userColums: string[] = ['id', 'email', 'username', 'emailConfirmed', 'realmRoles', 'realmApplications', 'actions'];
  userData: User[];
  realmId: string;

  ngOnInit(): void {
    this.realmId = this.route.snapshot.params.realmId;
    this.userService.getAllUsersByRealmId(this.realmId).subscribe(
      (res) => {
        this.userData = res;
        console.log('get all users res', res);
      },
      (err) => {
        console.log('get all users err', err);
      },
    );
  }

  openAddRealmRoleToUserDialog(user: User) {
    // this.userService.addRoleToUser(user).subscribe();
    this.dialog
      .open(RealmUserRolesDialogComponent, {
        data: { realmId: this.realmId, user },
      })
      .afterClosed()
      .subscribe(() => {
        this.ngOnInit();
      });
  }
}
