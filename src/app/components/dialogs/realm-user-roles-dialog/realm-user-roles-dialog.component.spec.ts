import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RealmUserRolesDialogComponent } from './realm-user-roles-dialog.component';

describe('RealmUserRolesDialogComponent', () => {
  let component: RealmUserRolesDialogComponent;
  let fixture: ComponentFixture<RealmUserRolesDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RealmUserRolesDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RealmUserRolesDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
