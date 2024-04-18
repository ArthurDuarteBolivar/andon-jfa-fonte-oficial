import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ErrorRouterComponent } from './error-router.component';

describe('ErrorRouterComponent', () => {
  let component: ErrorRouterComponent;
  let fixture: ComponentFixture<ErrorRouterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ErrorRouterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ErrorRouterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
