import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { of } from 'rxjs/observable/of';
import { _throw } from 'rxjs/observable/throw';
import { PostsComponent } from './posts.component';
import { Post } from '../post.interface';
import { MessageService } from '../../core/message.service';
import { messageServiceStub } from '../../../tests/message-service.stub';
import { CommonService } from '../../core/common.service';

describe('PostsComponent', () => {
  let component: PostsComponent;
  let fixture: ComponentFixture<PostsComponent>;

  const routerSpy: jasmine.SpyObj<Router> = jasmine.createSpyObj('Router', ['navigate']);

  describe('with successful route data subscription', () => {
    const posts: Post[] = [{ user_id: 1, title: 'Foo', content: 'Lorem Ipsum' }];

    beforeEach(async(() => {
      const routeStub = { data: of({ posts }) };

      TestBed.configureTestingModule({
        declarations: [ PostsComponent ],
        providers: [
          { provide: ActivatedRoute, useValue: routeStub },
          { provide: Router, useValue: routerSpy },
          { provide: CommonService, useValue: {} },
          { provide: MessageService, useValue: messageServiceStub },
        ],
        schemas: [ NO_ERRORS_SCHEMA ],
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

    it('should have posts property set', () => {
      expect(component.posts).toEqual(posts);
    });

    it('#onPostTitleClick should navigate to a single post', () => {
      const route = TestBed.get(ActivatedRoute);
      const router = TestBed.get(Router);
      const stringId = '123456';

      component.onPostTitleClick(stringId);

      expect(router.navigate).toHaveBeenCalledTimes(1);
      expect(router.navigate).toHaveBeenCalledWith([stringId], { relativeTo: route });
    });
  });

  describe('with unsuccessful route data subscription', () => {
    const errorMessage = 'foo';

    beforeEach(async(() => {
      const routeStub = { data: _throw(errorMessage) };

      TestBed.configureTestingModule({
        declarations: [ PostsComponent ],
        providers: [
          { provide: ActivatedRoute, useValue: routeStub },
          { provide: Router, useValue: routerSpy },
          { provide: CommonService, useValue: {} },
          { provide: MessageService, useValue: messageServiceStub },
        ],
        schemas: [ NO_ERRORS_SCHEMA ]
      })
      .compileComponents();
    }));

    beforeEach(() => {
      fixture = TestBed.createComponent(PostsComponent);
      component = fixture.componentInstance;
    });

    it('should create', () => {
      expect(component).toBeTruthy();
    });

    it('should show error message', () => {
      const errorSpy = spyOn(TestBed.get(MessageService), 'error');

      try {
        fixture.detectChanges();
      } catch (e) {
        expect(errorSpy).toHaveBeenCalledTimes(1);
        expect(errorSpy).toHaveBeenCalledWith(errorMessage);
      }
    });

    it('should have user property set to undefined', () => {
      try {
        fixture.detectChanges();
      } catch (e) { }

      expect(component.posts).toBeUndefined();
    });
  });
});
