import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContainerProductsComponent } from './container.component';

describe('ContainerComponent', () => {
  let component: ContainerProductsComponent;
  let fixture: ComponentFixture<ContainerProductsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContainerProductsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContainerProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
