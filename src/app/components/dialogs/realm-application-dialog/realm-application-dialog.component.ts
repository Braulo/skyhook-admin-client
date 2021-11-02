import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ExternalProviderService } from 'src/app/services/externalProvider/external-provider.service';
import { RealmApplicationService } from 'src/app/services/realmApplication/realm-application.service';
import { RealmApplicationURLService } from 'src/app/services/realmApplicationURL/realm-application-url.service';
import { ExternalProvider } from 'src/model/externalProvider.model';
import { Realm } from 'src/model/realm.model';
import { RealmApplication } from 'src/model/realmApplication.model';
import { RealmApplicationURL } from 'src/model/realmApplicationURL.model';

@Component({
  selector: 'app-realm-application-dialog',
  templateUrl: './realm-application-dialog.component.html',
  styleUrls: ['./realm-application-dialog.component.scss'],
})
export class RealmApplicationDialogComponent implements OnInit {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { realm: Realm; realmApplication: RealmApplication },
    private formBuilder: FormBuilder,
    private dialog: MatDialog,
    private realmApplicationService: RealmApplicationService,
    private realmApplicationURLService: RealmApplicationURLService,
    private externalProviderService: ExternalProviderService,
  ) {}

  realmApplicationForm = this.formBuilder.group({
    clientId: new FormControl('', [Validators.required]),
    clientSecret: new FormControl('', [Validators.required]),
    displayName: new FormControl('', [Validators.required]),
    realmApplicationUrl: new FormControl(''),
    externalProvider: this.formBuilder.group({
      name: [''],
      key: [''],
      secret: [''],
    }),
  });

  realmApplicationURLs: RealmApplicationURL[];
  externalProviders: ExternalProvider[];

  createOrUpdateText: string;
  ngOnInit(): void {
    this.realmApplicationForm.get('clientId').setValue(this.data?.realmApplication?.clientId);
    this.realmApplicationForm.get('clientSecret').setValue(this.data?.realmApplication?.clientSecret);
    this.realmApplicationForm.get('displayName').setValue(this.data?.realmApplication?.displayName);
    if (this.data.realmApplication) {
      this.realmApplicationService.getRealmApplicationById(this.data?.realmApplication?.id).subscribe((res) => {
        console.log('test', res.externalProvider);
        this.externalProviders = res.externalProvider;
        this.realmApplicationURLs = res.realmApplicationURLs;
      });
    }
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
    this.realmApplicationService.deleteRealmApplictionById(this.data.realmApplication.id).subscribe(() => {
      this.dialog.closeAll();
    });
  }

  deleteRealmApplicationURL(realmApplicationURL: RealmApplicationURL) {
    this.realmApplicationURLService.deleteRealmApplicationURLById(realmApplicationURL.id).subscribe(() => {
      this.ngOnInit();
    });
  }

  addRealmApplicationURL() {
    const newRealmApplicationURL: RealmApplicationURL = {
      realmApplication: this.data.realmApplication,
      url: this.realmApplicationForm.get('realmApplicationUrl').value,
    };

    this.realmApplicationURLService.addRealmApplicationURL(newRealmApplicationURL).subscribe(() => {
      this.realmApplicationForm.get('realmApplicationUrl').setValue('');
      this.ngOnInit();
    });
  }

  deleteExternalProvider(externalProvider: ExternalProvider) {
    this.externalProviderService.deleteExternalProviderbyId(externalProvider.id).subscribe((res) => {
      console.log('deleted external provider', res);

      this.ngOnInit();
    });
  }

  addExternalProvider() {
    const newExternalProvider: ExternalProvider = {
      key: this.realmApplicationForm.controls['externalProvider'].get('key').value,
      name: this.realmApplicationForm.controls['externalProvider'].get('name').value,
      realmApplicationId: this.data.realmApplication.id,
      secret: this.realmApplicationForm.controls['externalProvider'].get('secret').value,
      realmApplication: this.data.realmApplication,
    };

    this.externalProviderService.addExternalProvider(newExternalProvider).subscribe((res) => {
      this.ngOnInit();
    });
  }

  onSubmit() {
    if (this.data.realmApplication) {
      this.data.realmApplication.clientId = this.realmApplicationForm.get('clientId').value;
      this.data.realmApplication.clientSecret = this.realmApplicationForm.get('clientSecret').value;
      this.data.realmApplication.displayName = this.realmApplicationForm.get('displayName').value;

      this.realmApplicationService.updateRealmApplicationById(this.data.realmApplication).subscribe(() => {});
    } else {
      (this.data.realmApplication as any) = {
        clientId: this.realmApplicationForm.get('clientId').value,
        clientSecret: this.realmApplicationForm.get('clientSecret').value,
        displayName: this.realmApplicationForm.get('displayName').value,
      };
      this.realmApplicationService
        .createRealmApplicationByRealmId(this.data.realm.id, this.data.realmApplication)
        .subscribe();
    }
    this.dialog.closeAll();
  }
}
