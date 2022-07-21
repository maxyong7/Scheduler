import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TimeSpaceComponent } from './time-space.component';

describe('TimeSpaceComponent', () => {
  let component: TimeSpaceComponent;
  let fixture: ComponentFixture<TimeSpaceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TimeSpaceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TimeSpaceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
