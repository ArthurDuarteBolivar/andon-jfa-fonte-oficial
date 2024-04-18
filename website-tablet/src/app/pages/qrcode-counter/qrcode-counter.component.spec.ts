import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QrcodeCounterComponent } from './qrcode-counter.component';

describe('QrcodeCounterComponent', () => {
  let component: QrcodeCounterComponent;
  let fixture: ComponentFixture<QrcodeCounterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QrcodeCounterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QrcodeCounterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
