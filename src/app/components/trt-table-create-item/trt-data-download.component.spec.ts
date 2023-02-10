import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrtDataDownloadComponent } from './trt-data-download.component';

describe('TrtTableCreateItemComponent', () => {
  let component: TrtDataDownloadComponent;
  let fixture: ComponentFixture<TrtDataDownloadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TrtDataDownloadComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TrtDataDownloadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
