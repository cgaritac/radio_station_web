import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SchedulePage } from './schedule.page';

describe('Schedule', () => {
  let component: SchedulePage;
  let fixture: ComponentFixture<SchedulePage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SchedulePage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SchedulePage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
