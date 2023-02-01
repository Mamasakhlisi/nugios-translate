import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrtTableComponent } from './trt-table.component';

describe('TrtTableComponent', () => {
  let component: TrtTableComponent;
  let fixture: ComponentFixture<TrtTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TrtTableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TrtTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
