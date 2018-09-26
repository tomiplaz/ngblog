import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatePostComponent } from './create-post.component';
import { PostsModule } from '../posts.module';
import { AppRoutingModule } from '../../app-routing.module';
import { CoreModule } from '../../core/core.module';

describe('CreatePostComponent', () => {
  let component: CreatePostComponent;
  let fixture: ComponentFixture<CreatePostComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ PostsModule, CoreModule, AppRoutingModule ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreatePostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
