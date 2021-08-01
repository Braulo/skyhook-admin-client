import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { ApiService } from 'src/app/services/api/api.service';
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
  constructor(private apiService: ApiService, private dialog: MatDialog) {}

  realmColumns: string[] = ['id', 'name', 'realmApplications', 'realmRoles', 'actions'];
  realmData: Realm[];

  ngOnInit(): void {
    console.log('init');
    this.apiService.get<Realm[]>('/realm/1').subscribe(
      (res) => {
        console.log('Realms', res);
        this.realmData = res;
      },
      (err) => {
        console.log('err', err);
      },
    );
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
    this.apiService.delete<Realm>(`/realm/${realmData.id}`).subscribe(
      (res) => {
        console.log('res delete', res);
        this.ngOnInit();
      },
      (err) => {},
    );
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
