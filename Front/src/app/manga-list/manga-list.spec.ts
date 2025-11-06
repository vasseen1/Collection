import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MangaList } from './manga-list';

describe('MangaList', () => {
  let component: MangaList;
  let fixture: ComponentFixture<MangaList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MangaList]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MangaList);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
