import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VolumeEdit } from './volume-edit';

describe('VolumeEdit', () => {
  let component: VolumeEdit;
  let fixture: ComponentFixture<VolumeEdit>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VolumeEdit]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VolumeEdit);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
