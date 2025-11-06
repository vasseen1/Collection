import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VolumeForm } from './volume-form';

describe('VolumeForm', () => {
  let component: VolumeForm;
  let fixture: ComponentFixture<VolumeForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VolumeForm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VolumeForm);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
