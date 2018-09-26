import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs/observable/of';

import { PostComponent } from './post.component';
import { PostsModule } from '../posts.module';
import { Post } from '../post.interface';

describe('PostComponent', () => {
  let component: PostComponent;
  let fixture: ComponentFixture<PostComponent>;

  beforeEach(async(() => {
    const post: Post = { user_id: 1, title: 'Foo', content: 'Lorem Ipsum' };
    const routeMock = { data: of({ post }) };

    TestBed.configureTestingModule({
      imports: [ PostsModule ],
      providers: [
        { provide: ActivatedRoute, useValue: routeMock },
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
