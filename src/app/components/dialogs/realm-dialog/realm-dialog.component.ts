import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { RealmService } from 'src/app/services/realm/realm-service.service';
import { Realm } from 'src/model/realm.model';

@Component({
  selector: 'app-realm-dialog',
  templateUrl: './realm-dialog.component.html',
  styleUrls: ['./realm-dialog.component.scss'],
})
export class RealmDialogComponent implements OnInit {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: Realm,
    private formBuilder: FormBuilder,
    private dialog: MatDialog,
    private realmService: RealmService,
  ) {}

  realmForm = this.formBuilder.group({
    name: new FormControl('', [Validators.required]),
  });

  createOrUpdateText: string;

  ngOnInit(): void {
    this.realmForm.get('name').setValue(this.data?.name);
  }

  getErrorMessage() {
    if (this.realmForm.get('name').hasError('required')) {
      return 'You must enter a value';
    }
    return '';
  }

  onSubmit() {
    if (!this.data) {
      this.data = {
        name: this.realmForm.get('name').value,
      };
      this.data.name = this.realmForm.get('name').value;
      this.realmService.createRealm(this.data).subscribe();
    } else {
      this.data.name = this.realmForm.get('name').value;
      this.realmService.updateRealm(this.data).subscribe();
    }
    this.dialog.closeAll();
  }
}
