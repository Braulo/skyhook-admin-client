import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RealmDialogComponent } from './realm-dialog.component';

describe('RealmDialogComponent', () => {
  let component: RealmDialogComponent;
  let fixture: ComponentFixture<RealmDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RealmDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RealmDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
