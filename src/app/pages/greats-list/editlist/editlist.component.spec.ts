import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditlistComponent } from './editlist.component';

describe('EditlistComponent', () => {
  let component: EditlistComponent;
  let fixture: ComponentFixture<EditlistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditlistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
