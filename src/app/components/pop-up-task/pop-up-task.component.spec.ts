import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopUpTaskComponent } from './pop-up-task.component';

describe('PopUpTaskComponent', () => {
  let component: PopUpTaskComponent;
  let fixture: ComponentFixture<PopUpTaskComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PopUpTaskComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PopUpTaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
