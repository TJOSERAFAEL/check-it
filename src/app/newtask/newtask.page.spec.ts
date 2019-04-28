import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewtaskPage } from './newtask.page';

describe('NewtaskPage', () => {
  let component: NewtaskPage;
  let fixture: ComponentFixture<NewtaskPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewtaskPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewtaskPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
