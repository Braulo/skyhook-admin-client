import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ApiService } from 'src/app/services/api/api.service';
import { Realm } from 'src/model/realm.model';
import { RealmApplication } from 'src/model/realmApplication.model';

@Component({
  selector: 'app-realm-application-dialog',
  templateUrl: './realm-application-dialog.component.html',
  styleUrls: ['./realm-application-dialog.component.scss'],
})
export class RealmApplicationDialogComponent implements OnInit {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { realm: Realm; realmApplication: RealmApplication },
    private formBuilder: FormBuilder,
    private apiService: ApiService,
    private dialog: MatDialog,
  ) {}

  realmApplicationForm = this.formBuilder.group({
    clientId: new FormControl('', [Validators.required]),
    clientSecret: new FormControl('', [Validators.required]),
    displayName: new FormControl('', [Validators.required]),
  });

  createOrUpdateText: string;
  ngOnInit(): void {
    console.log('data', this.data);
    this.realmApplicationForm.get('clientId').setValue(this.data?.realmApplication?.clientId);
    this.realmApplicationForm.get('clientSecret').setValue(this.data?.realmApplication?.clientSecret);
    this.realmApplicationForm.get('displayName').setValue(this.data?.realmApplication?.displayName);
  }

  getErrorMessage() {
    if (
      this.realmApplicationForm.get('clientId').hasError('required') ||
      this.realmApplicationForm.get('clientSecret').hasError('required') ||
      this.realmApplicationForm.get('displayName').hasError('required')
    ) {
      return 'You must enter a value';
    }
    return '';
  }

  onSubmit() {
    if (this.data.realmApplication) {
      this.data.realmApplication.clientId = this.realmApplicationForm.get('clientId').value;
      this.data.realmApplication.clientSecret = this.realmApplicationForm.get('clientSecret').value;
      this.data.realmApplication.displayName = this.realmApplicationForm.get('displayName').value;
      this.apiService
        .update<RealmApplication, RealmApplication>(
          `/realmapplication/1/${this.data.realmApplication.id}`,
          this.data.realmApplication,
        )
        .subscribe(
          (res) => {
            console.log('update realm app res', res);
          },
          (err) => {
            console.log('upate realm app err', err);
          },
        );
    } else {
      (this.data.realmApplication as any) = {
        clientId: this.realmApplicationForm.get('clientId').value,
        clientSecret: this.realmApplicationForm.get('clientSecret').value,
        displayName: this.realmApplicationForm.get('displayName').value,
        realmId: this.data.realm.id,
      };
      this.apiService
        .post<RealmApplication, RealmApplication>(`/realmapplication/1`, this.data.realmApplication)
        .subscribe(
          (res) => {
            console.log('create realm app res', res);
          },
          (err) => {
            console.log('create realm app err', err);
          },
        );
    }
    this.dialog.closeAll();
  }
}
