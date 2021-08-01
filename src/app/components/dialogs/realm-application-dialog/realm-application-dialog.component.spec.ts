import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RealmApplicationDialogComponent } from './realm-application-dialog.component';

describe('RealmApplicationDialogComponent', () => {
  let component: RealmApplicationDialogComponent;
  let fixture: ComponentFixture<RealmApplicationDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RealmApplicationDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RealmApplicationDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
