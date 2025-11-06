import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MangaForm } from './manga-form';

describe('MangaForm', () => {
  let component: MangaForm;
  let fixture: ComponentFixture<MangaForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MangaForm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MangaForm);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
