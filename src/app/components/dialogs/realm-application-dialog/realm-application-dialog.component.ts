import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ApiService } from 'src/app/services/api/api.service';
import { RealmApplicationService } from 'src/app/services/realmApplication/realm-application.service';
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
    private realmApplicationService: RealmApplicationService,
  ) {}

  realmApplicationForm = this.formBuilder.group({
    clientId: new FormControl('', [Validators.required]),
    clientSecret: new FormControl('', [Validators.required]),
    displayName: new FormControl('', [Validators.required]),
  });

  createOrUpdateText: string;
  ngOnInit(): void {
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

  deleteRealmApplication() {
    this.realmApplicationService.deleteRealmApplictionById(this.data.realmApplication.id).subscribe((res) => {
      this.dialog.closeAll();
    });
  }
  onSubmit() {
    if (this.data.realmApplication) {
      this.data.realmApplication.clientId = this.realmApplicationForm.get('clientId').value;
      this.data.realmApplication.clientSecret = this.realmApplicationForm.get('clientSecret').value;
      this.data.realmApplication.displayName = this.realmApplicationForm.get('displayName').value;

      this.realmApplicationService
        .updateRealmApplicationById(this.data.realmApplication.id, this.data.realmApplication)
        .subscribe((res) => {
          console.log('update realmappictaion', res);
        });
    } else {
      (this.data.realmApplication as any) = {
        clientId: this.realmApplicationForm.get('clientId').value,
        clientSecret: this.realmApplicationForm.get('clientSecret').value,
        displayName: this.realmApplicationForm.get('displayName').value,
      };
      this.realmApplicationService
        .createRealmApplicationByRealmId(this.data.realm.id, this.data.realmApplication)
        .subscribe((res) => {
          console.log('create realm ', res);
        });
    }
    this.dialog.closeAll();
  }
}
