import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestdocComponent } from './gestdoc.component';

describe('GestdocComponent', () => {
  let component: GestdocComponent;
  let fixture: ComponentFixture<GestdocComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GestdocComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GestdocComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
