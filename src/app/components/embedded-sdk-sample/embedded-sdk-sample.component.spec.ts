import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmbeddedSDKSampleComponent } from './embedded-sdk-sample.component';

describe('EmbeddedSDKSampleComponent', () => {
  let component: EmbeddedSDKSampleComponent;
  let fixture: ComponentFixture<EmbeddedSDKSampleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmbeddedSDKSampleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmbeddedSDKSampleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
