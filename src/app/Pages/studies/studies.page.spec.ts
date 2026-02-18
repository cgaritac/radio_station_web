import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudiesPage } from './studies.page';

describe('Studies', () => {
  let component: StudiesPage;
  let fixture: ComponentFixture<StudiesPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StudiesPage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StudiesPage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
