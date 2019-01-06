import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterModule, Router, ActivatedRoute } from '@angular/router';
import { CommentItemComponent } from './comment-item.component';
import { Comment } from '../comment.interface';

describe('CommentItemComponent', () => {
  let component: CommentItemComponent;
  let fixture: ComponentFixture<CommentItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ RouterModule ],
      declarations: [ CommentItemComponent ],
      providers: [
        { provide: Router, useValue: {} },
        { provide: ActivatedRoute, useValue: {} },
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CommentItemComponent);
    component = fixture.componentInstance;
  });

  describe('with no comment input provided', () => {
    it('should throw error', () => {
      try {
        fixture.detectChanges();
      } catch (e) {
        expect(e.message).toBe(component.COMMENT_REQUIRED);
      }
    });
  });

  describe('with comment input provided', () => {
    const comment: Comment = {
      user_id: 1,
      user: { name: 'Foo', email: 'foo@foo.foo' },
      text: 'foobar',
      created_at: '2018-12-18 18:38:15Z',
    };

    beforeEach(() => {
      component.comment = comment;
    });

    it('should create', () => {
      fixture.detectChanges();
      expect(component).toBeTruthy();
    });
  });
});
