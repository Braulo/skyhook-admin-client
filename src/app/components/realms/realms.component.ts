import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/services/auth/auth/auth.service';
import { RealmService } from 'src/app/services/realm/realm-service.service';
import { Realm } from 'src/model/realm.model';
import { RealmApplication } from 'src/model/realmApplication.model';
import { RealmRole } from 'src/model/realmRoles.model';
import { RealmApplicationDialogComponent } from '../dialogs/realm-application-dialog/realm-application-dialog.component';
import { RealmDialogComponent } from '../dialogs/realm-dialog/realm-dialog.component';
import { RealmRolesDialogComponent } from '../dialogs/realm-roles-dialog/realm-roles-dialog.component';

@Component({
  selector: 'app-realms',
  templateUrl: './realms.component.html',
  styleUrls: ['./realms.component.scss'],
})
export class RealmsComponent implements OnInit {
  public realms: Observable<Realm[]>;
  constructor(
    private realmService: RealmService,
    private dialog: MatDialog,
    private router: Router,
    private authService: AuthService,
  ) {}

  realmColumns: string[] = ['id', 'name', 'realmApplications', 'realmRoles', 'actions'];
  realmData: Realm[];
  username: string;
  email: string;

  ngOnInit(): void {
    this.realmService.getAppRealms().subscribe((res) => {
      console.log('app Realms', res);

      this.realmData = res;
    });
    this.username = localStorage.getItem('username');
    this.email = localStorage.getItem('email');
  }

  openRealmDialog(realmData: Realm = null) {
    this.dialog
      .open(RealmDialogComponent, {
        data: realmData,
      })
      .afterClosed()
      .subscribe(() => {
        this.ngOnInit();
      });
  }

  deleteRealm(realmData: Realm) {
    this.realmService.deleteRealmById(realmData.id, realmData).subscribe(() => {
      this.ngOnInit();
    });
  }

  showAllUserForRealm(realm: Realm) {
    this.router.navigateByUrl(`/users/${realm.id}`);
  }
  openRealmApplicationDialog(realm: Realm = null, realmApplication: RealmApplication = null) {
    this.dialog
      .open(RealmApplicationDialogComponent, {
        data: { realmApplication, realm },
      })
      .afterClosed()
      .subscribe(() => {
        this.ngOnInit();
      });
  }

  openRealmRolesDialog(realm: Realm, realmRole: RealmRole = null) {
    this.dialog
      .open(RealmRolesDialogComponent, {
        data: {
          realm,
          realmRole,
        },
      })
      .afterClosed()
      .subscribe(() => {
        this.ngOnInit();
      });
  }

  logout() {
    this.authService.logout().subscribe((res) => {
      this.router.navigateByUrl('/login');
    });
  }
}
