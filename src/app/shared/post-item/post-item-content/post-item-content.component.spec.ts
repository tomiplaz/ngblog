import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PostItemContentComponent } from './post-item-content.component';

describe('PostItemContentComponent', () => {
  let component: PostItemContentComponent;
  let fixture: ComponentFixture<PostItemContentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PostItemContentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PostItemContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
