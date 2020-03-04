import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeFocusComponent } from './home-focus.component';

describe('HomeFocusComponent', () => {
  let component: HomeFocusComponent;
  let fixture: ComponentFixture<HomeFocusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeFocusComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeFocusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
