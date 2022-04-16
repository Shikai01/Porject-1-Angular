import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EMatComponentComponent } from './emat-component.component';

describe('EMatComponentComponent', () => {
  let component: EMatComponentComponent;
  let fixture: ComponentFixture<EMatComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EMatComponentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EMatComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
