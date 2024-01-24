import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TargetProductComponent } from './target-product.component';

describe('TargetProductComponent', () => {
  let component: TargetProductComponent;
  let fixture: ComponentFixture<TargetProductComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TargetProductComponent]
    });
    fixture = TestBed.createComponent(TargetProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
