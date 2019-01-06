import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA, SecurityContext } from '@angular/core';
import { Router } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { PostItemComponent } from './post-item.component';
import { Post } from '../post.interface';
import { SharedModule } from 'app/shared/shared.module';

describe('PostItemComponent', () => {
  let component: PostItemComponent;
  let fixture: ComponentFixture<PostItemComponent>;

  beforeEach(async(() => {
    const routerStub = {
      navigate: () => {},
    };
    const domSanitizerStub = {
      sanitize: () => {},
    };

    TestBed.configureTestingModule({
      imports: [ SharedModule ],
      declarations: [ PostItemComponent ],
      providers: [
        { provide: Router, useValue: routerStub },
        { provide: DomSanitizer, useValue: domSanitizerStub },
      ],
      schemas: [ NO_ERRORS_SCHEMA ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PostItemComponent);
    component = fixture.componentInstance;
  });

  describe('with no post input provided', () => {
    it('should throw error', () => {
      try {
        fixture.detectChanges();
      } catch (e) {
        expect(e.message).toBe(component.POST_REQUIRED);
      }
    });
  });

  describe('with post input provided', () => {
    let domSanitizer: DomSanitizer;
    const post: Post = {
      user_id: 1,
      user: { name: 'Bar', email: 'bar@bar.bar' },
      key: 'foo',
      title: 'Foo',
      content: 'Lorem Ipsum',
      tags: [],
    };

    beforeEach(() => {
      domSanitizer = TestBed.get(DomSanitizer);
      component.post = post;
    });

    it('should create', () => {
      fixture.detectChanges();
      expect(component).toBeTruthy();
    });

    it('should initialize sanitizedPostContent prop to sanitized post\'s content', () => {
      const sanitizedValue = 'foo';
      const sanitizeSpy = spyOn(domSanitizer, 'sanitize').and.returnValue(sanitizedValue);

      fixture.detectChanges();

      expect(sanitizeSpy).toHaveBeenCalled();
      expect(sanitizeSpy).toHaveBeenCalledWith(SecurityContext.HTML, post.content);
      expect(component.sanitizedPostContent).toBe(sanitizedValue);
    });

    describe('#onTitleClick', () => {
      let router: Router;
      let navigateSpy: jasmine.Spy;

      beforeEach(() => {
        router = TestBed.get(Router);
        navigateSpy = spyOn(router, 'navigate');
      });

      function insideEach(isPreview: boolean) {
        fixture.detectChanges();
        component.isPreview = isPreview;
        component.onTitleClick();
      }

      it('shouldn\'t navigate if it isn\'t preview', () => {
        insideEach(false);

        expect(navigateSpy).not.toHaveBeenCalled();
      });

      it('should navigate to post route if it is preview', () => {
        insideEach(true);

        expect(navigateSpy).toHaveBeenCalledTimes(1);
        expect(navigateSpy).toHaveBeenCalledWith(['/posts', post.key]);
      });
    });
  });
});
