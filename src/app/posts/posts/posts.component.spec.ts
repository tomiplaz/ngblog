import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs/observable/of';

import { PostsComponent } from './posts.component';
import { PostsModule } from '../posts.module';
import { Post } from '../post.interface';
import { AppRoutingModule } from '../../app-routing.module';
import { CoreModule } from '../../core/core.module';

describe('PostsComponent', () => {
  let component: PostsComponent;
  let fixture: ComponentFixture<PostsComponent>;

  beforeEach(async(() => {
    const posts: Post[] = [{ user_id: 1, title: 'Foo', content: 'Lorem Ipsum' }];
    const routeMock = { data: of(posts) };

    TestBed.configureTestingModule({
      imports: [ PostsModule, AppRoutingModule, CoreModule ],
      providers: [
        { provide: ActivatedRoute, useValue: routeMock },
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PostsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
