import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MangaEdit } from './manga-edit';

describe('MangaEdit', () => {
  let component: MangaEdit;
  let fixture: ComponentFixture<MangaEdit>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MangaEdit]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MangaEdit);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
