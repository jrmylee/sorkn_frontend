import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScriptNewComponent } from './script-new.component';

describe('ScriptNewComponent', () => {
  let component: ScriptNewComponent;
  let fixture: ComponentFixture<ScriptNewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScriptNewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScriptNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
