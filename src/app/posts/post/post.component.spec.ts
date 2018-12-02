import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs/observable/of';
import { _throw } from 'rxjs/observable/throw';

import { PostComponent } from './post.component';
import { Post } from '../post.interface';
import { Comment } from '../comment.interface';
import { CommonService } from '../../core/common.service';
import { MessageService } from '../../core/message.service';
import { messageServiceStub } from '../../../tests/message-service.stub';

fdescribe('PostComponent', () => {
  let component: PostComponent;
  let fixture: ComponentFixture<PostComponent>;

  describe('with valid route', () => {
    const post: Post = { user_id: 1, title: 'Foo', content: 'Lorem Ipsum', comments: [] };

    beforeEach(async(() => {
      const routeStub = { data: of({ post }) };

      TestBed.configureTestingModule({
        declarations: [ PostComponent ],
        providers: [
          { provide: ActivatedRoute, useValue: routeStub },
          { provide: CommonService, useValue: {} },
          { provide: MessageService, useValue: messageServiceStub },
        ],
        schemas: [ NO_ERRORS_SCHEMA ]
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

    it('should have post property set', () => {
      expect(component.post).toEqual(post);
    });

    it('#onComment added should add comment to post\'s comments', () => {
      const mockComment: Comment = { user_id: 1, text: 'Foo bar baz!' };

      component.onCommentAdded(mockComment);

      expect(component.post.comments).toEqual([ mockComment ]);
    });
  });

  describe('with invalid route', () => {
    const errorMessage = 'foo';

    beforeEach(async(() => {
      const routeStub = { data: _throw(errorMessage) };

      TestBed.configureTestingModule({
        declarations: [ PostComponent ],
        providers: [
          { provide: ActivatedRoute, useValue: routeStub },
          { provide: CommonService, useValue: {} },
          { provide: MessageService, useValue: messageServiceStub },
        ],
        schemas: [ NO_ERRORS_SCHEMA ]
      })
      .compileComponents();
    }));

    it('should show error message', () => {
      const errorSpy = spyOn(TestBed.get(MessageService), 'error');

      const fixture = TestBed.createComponent(PostComponent);
      const component = fixture.componentInstance;

      try {
        fixture.detectChanges();
      } catch (e) {
        expect(errorSpy).toHaveBeenCalledTimes(1);
        expect(errorSpy).toHaveBeenCalledWith(errorMessage);
      }

      expect(component.post).toBe(undefined);
    });
  });
});
