import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewsPage } from './news.page';

describe('News', () => {
  let component: NewsPage;
  let fixture: ComponentFixture<NewsPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewsPage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewsPage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
