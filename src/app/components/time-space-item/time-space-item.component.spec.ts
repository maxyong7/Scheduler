import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TimeSpaceItemComponent } from './time-space-item.component';

describe('TimeSpaceItemComponent', () => {
  let component: TimeSpaceItemComponent;
  let fixture: ComponentFixture<TimeSpaceItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TimeSpaceItemComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TimeSpaceItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
