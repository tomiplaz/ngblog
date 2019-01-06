import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { of } from 'rxjs';
import { HomeComponent } from './home.component';
import { CommonService } from 'app/core/common.service';
import { HomeData } from './home-data.interface';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async(() => {
    const data: HomeData = {
      posts: {
        recent: [],
        random: [],
      },
      stats: {
        users_count: null,
        posts_count: null,
        comments_count: null,
      },
    };
    const routeStub = { data: of({ data }) };

    TestBed.configureTestingModule({
      declarations: [ HomeComponent ],
      providers: [
        { provide: ActivatedRoute, useValue: routeStub },
        { provide: CommonService, useValue: {} },
      ],
      schemas: [ NO_ERRORS_SCHEMA ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
