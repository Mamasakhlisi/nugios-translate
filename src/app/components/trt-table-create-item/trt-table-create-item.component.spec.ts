import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrtTableCreateItemComponent } from './trt-table-create-item.component';

describe('TrtTableCreateItemComponent', () => {
  let component: TrtTableCreateItemComponent;
  let fixture: ComponentFixture<TrtTableCreateItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TrtTableCreateItemComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TrtTableCreateItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
