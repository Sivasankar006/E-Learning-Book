import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeaturesBooksComponent } from './features-books.component';

describe('FeaturesBooksComponent', () => {
  let component: FeaturesBooksComponent;
  let fixture: ComponentFixture<FeaturesBooksComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FeaturesBooksComponent]
    });
    fixture = TestBed.createComponent(FeaturesBooksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
