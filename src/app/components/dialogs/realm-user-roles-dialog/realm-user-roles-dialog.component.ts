import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { RealmRoleService } from 'src/app/services/realmRole/realm-role.service';
import { UserService } from 'src/app/services/user/user.service';
import { RealmRole } from 'src/model/realmRoles.model';
import { User } from 'src/model/user.model';

@Component({
  selector: 'app-realm-user-roles-dialog',
  templateUrl: './realm-user-roles-dialog.component.html',
  styleUrls: ['./realm-user-roles-dialog.component.scss'],
})
export class RealmUserRolesDialogComponent implements OnInit {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { realmId: string; user: User },
    private realmRoleService: RealmRoleService,
    private userService: UserService,
  ) {}

  realmRoles: RealmRole[];
  selectedRole: RealmRole;

  ngOnInit(): void {
    this.realmRoleService.getAllRealmRolesByRealmId(this.data.realmId).subscribe((res) => {
      this.realmRoles = res;
    });
  }

  addRoleToUser() {
    this.data.user.realmRoles.push(this.selectedRole);
    this.userService.updateUser(this.data.user).subscribe();
  }

  deleteRoleFromUser() {
    const newRoles = this.data.user.realmRoles.filter((role) => {
      return role.id !== this.selectedRole.id;
    });

    this.data.user.realmRoles = newRoles;

    this.userService.updateUser(this.data.user).subscribe();
  }
}
