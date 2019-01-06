import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { Router } from '@angular/router';
import { CreatePostComponent } from './create-post.component';
import { PostsService } from 'app/core/api/posts.service';
import { MessageService } from 'app/core/message.service';
import { messageServiceStub } from 'tests/message-service.stub';

describe('CreatePostComponent', () => {
  let component: CreatePostComponent;
  let fixture: ComponentFixture<CreatePostComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreatePostComponent ],
      providers: [
        { provide: Router, useValue: {} },
        { provide: PostsService, useValue: {} },
        { provide: MessageService, useValue: messageServiceStub },
      ],
      schemas: [ NO_ERRORS_SCHEMA ]
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
