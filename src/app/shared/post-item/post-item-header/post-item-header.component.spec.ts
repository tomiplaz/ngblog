import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PostItemHeaderComponent } from './post-item-header.component';

describe('PostItemHeaderComponent', () => {
  let component: PostItemHeaderComponent;
  let fixture: ComponentFixture<PostItemHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PostItemHeaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PostItemHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
