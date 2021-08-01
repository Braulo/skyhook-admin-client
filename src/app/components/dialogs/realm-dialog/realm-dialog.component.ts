import { Component, Inject, OnInit } from '@angular/core';
import { inject } from '@angular/core/testing';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { MatDialog, MatDialogConfig, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ApiService } from 'src/app/services/api/api.service';
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
    private apiService: ApiService,
    private dialog: MatDialog,
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
      this.apiService.post<Realm, Realm>('/realm/1', this.data).subscribe(
        (res) => {
          this.dialog.closeAll();
        },
        (err) => {
          console.log('err create', err);
        },
      );
    } else {
      this.data.name = this.realmForm.get('name').value;
      this.apiService.update<Realm, Realm>(`/realm/${this.data.id}`, this.data).subscribe();
    }
  }
}
