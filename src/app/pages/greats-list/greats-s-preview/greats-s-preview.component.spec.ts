import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GreatsSPreviewComponent } from './greats-s-preview.component';

describe('GreatsSPreviewComponent', () => {
  let component: GreatsSPreviewComponent;
  let fixture: ComponentFixture<GreatsSPreviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GreatsSPreviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GreatsSPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
