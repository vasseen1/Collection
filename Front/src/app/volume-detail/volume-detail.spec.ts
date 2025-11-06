import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VolumeDetail } from './volume-detail';

describe('VolumeDetail', () => {
  let component: VolumeDetail;
  let fixture: ComponentFixture<VolumeDetail>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VolumeDetail]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VolumeDetail);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
