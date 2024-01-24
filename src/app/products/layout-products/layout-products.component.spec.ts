import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LayoutProductsComponent } from './layout-products.component';

describe('LayoutProductsComponent', () => {
  let component: LayoutProductsComponent;
  let fixture: ComponentFixture<LayoutProductsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LayoutProductsComponent]
    });
    fixture = TestBed.createComponent(LayoutProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
