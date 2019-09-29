import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowDocViewComponent } from './show-doc-view.component';

describe('ShowDocViewComponent', () => {
  let component: ShowDocViewComponent;
  let fixture: ComponentFixture<ShowDocViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowDocViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowDocViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
