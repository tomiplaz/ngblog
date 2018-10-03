import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PostItemComponent } from './post-item.component';
import { Post } from '../post.interface';

describe('PostItemComponent', () => {
  let component: PostItemComponent;
  let fixture: ComponentFixture<PostItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PostItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    const post: Post = { user_id: 1, title: 'Foo', content: 'Lorem Ipsum' };

    fixture = TestBed.createComponent(PostItemComponent);
    component = fixture.componentInstance;
    component.post = post;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
