import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EProfComponentComponent } from './eprof-component.component';

describe('EProfComponentComponent', () => {
  let component: EProfComponentComponent;
  let fixture: ComponentFixture<EProfComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EProfComponentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EProfComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
