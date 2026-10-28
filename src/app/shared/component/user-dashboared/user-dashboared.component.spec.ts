import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserDashboaredComponent } from './user-dashboared.component';

describe('UserDashboaredComponent', () => {
  let component: UserDashboaredComponent;
  let fixture: ComponentFixture<UserDashboaredComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserDashboaredComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserDashboaredComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
