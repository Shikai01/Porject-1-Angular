import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisitarPaginaComponent } from './visitar-pagina.component';

describe('VisitarPaginaComponent', () => {
  let component: VisitarPaginaComponent;
  let fixture: ComponentFixture<VisitarPaginaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VisitarPaginaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VisitarPaginaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
