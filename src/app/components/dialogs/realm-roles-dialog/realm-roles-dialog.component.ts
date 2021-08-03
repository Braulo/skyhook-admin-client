import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { RealmRoleService } from 'src/app/services/realmRole/realm-role.service';
import { Realm } from 'src/model/realm.model';
import { RealmRole } from 'src/model/realmRoles.model';

@Component({
  selector: 'app-realm-roles-dialog',
  templateUrl: './realm-roles-dialog.component.html',
  styleUrls: ['./realm-roles-dialog.component.scss'],
})
export class RealmRolesDialogComponent implements OnInit {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { realm: Realm; realmRole: RealmRole },
    private formBuilder: FormBuilder,
    private dialog: MatDialog,
    private realmRoleService: RealmRoleService,
  ) {}

  realmRoleForm = this.formBuilder.group({
    name: new FormControl('', [Validators.required]),
    displayName: new FormControl('', [Validators.required]),
  });

  ngOnInit(): void {
    this.realmRoleForm.get('name').setValue(this.data?.realmRole?.name);
    this.realmRoleForm.get('displayName').setValue(this.data?.realmRole?.displayName);
  }

  getErrorMessage() {
    if (
      this.realmRoleForm.get('name').hasError('required') ||
      this.realmRoleForm.get('displayName').hasError('required')
    ) {
      return 'You must enter a value';
    }
    return '';
  }

  deleteRealmRole() {
    this.realmRoleService.deleteRealmRoleById(this.data.realmRole.id).subscribe(() => {
      this.dialog.closeAll();
    });
  }
  onSubmit() {
    if (this.data.realmRole) {
      // Update RealmRole
      this.data.realmRole.name = this.realmRoleForm.get('name').value;
      this.data.realmRole.displayName = this.realmRoleForm.get('displayName').value;

      this.realmRoleService.updateRealmRoleById(this.data.realmRole).subscribe();
    } else {
      // Create RealmRole
      this.data.realmRole = {
        displayName: this.realmRoleForm.get('displayName').value,
        name: this.realmRoleForm.get('name').value,
        users: null,
        realm: this.data.realm,
      };

      this.realmRoleService.createRealmRole(this.data.realmRole).subscribe();
    }
    this.dialog.closeAll();
  }
}
