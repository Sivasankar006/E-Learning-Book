import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OwnBookComponent } from './own-book.component';

describe('OwnBookComponent', () => {
  let component: OwnBookComponent;
  let fixture: ComponentFixture<OwnBookComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OwnBookComponent]
    });
    fixture = TestBed.createComponent(OwnBookComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
