import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RealmRolesDialogComponent } from './realm-roles-dialog.component';

describe('RealmRolesDialogComponent', () => {
  let component: RealmRolesDialogComponent;
  let fixture: ComponentFixture<RealmRolesDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RealmRolesDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RealmRolesDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
