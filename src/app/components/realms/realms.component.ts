import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { RealmService } from 'src/app/services/realm/realm-service.service';
import { Realm } from 'src/model/realm.model';
import { RealmApplication } from 'src/model/realmApplication.model';
import { RealmApplicationDialogComponent } from '../dialogs/realm-application-dialog/realm-application-dialog.component';
import { RealmDialogComponent } from '../dialogs/realm-dialog/realm-dialog.component';

@Component({
  selector: 'app-realms',
  templateUrl: './realms.component.html',
  styleUrls: ['./realms.component.scss'],
})
export class RealmsComponent implements OnInit {
  public realms: Observable<Realm[]>;
  constructor(private realmService: RealmService, private dialog: MatDialog) {}

  realmColumns: string[] = ['id', 'name', 'realmApplications', 'realmRoles', 'actions'];
  realmData: Realm[];

  ngOnInit(): void {
    this.realmService.getAppRealms().subscribe((res) => {
      this.realmData = res;
    });
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
    this.realmService.deleteRealmById(realmData.id, realmData).subscribe((res) => {
      this.ngOnInit();
    });
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
}
