import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { SearchComponent } from './search.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { activatedRouteStub } from '../../../tests/activated-route.stub';

describe('SearchComponent', () => {
  let component: SearchComponent;
  let fixture: ComponentFixture<SearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ ReactiveFormsModule ],
      declarations: [ SearchComponent ],
      providers: [
        { provide: ActivatedRoute, useValue: activatedRouteStub },
      ],
      schemas: [ NO_ERRORS_SCHEMA ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should get search query param value', () => {
    const route = TestBed.get(ActivatedRoute);
    const getSpy = spyOn(route.snapshot.queryParamMap, 'get');

    fixture.detectChanges();

    expect(getSpy).toHaveBeenCalledTimes(1);
    expect(getSpy).toHaveBeenCalledWith('search');
  });

  it('should set form control value to default value when search query param is not present', () => {
    fixture.detectChanges();

    expect(component.search.value).toEqual(component.DEFAULT_VALUE);
  });

  it('should set form control value to search query param when it is present', () => {
    const orderQueryParam = 'foo';
    const route = TestBed.get(ActivatedRoute);

    spyOn(route.snapshot.queryParamMap, 'get').and.returnValue(orderQueryParam);

    fixture.detectChanges();

    expect(component.search.value).toEqual(orderQueryParam);
  });

  it('should subscribe to value change', () => {
    const subscribeSpy = spyOn(component.search.valueChanges, 'subscribe').and.callThrough();

    fixture.detectChanges();

    expect(subscribeSpy).toHaveBeenCalledTimes(1);
  });

  it('should emit Params object with search key value pair on value change', () => {
    const search = 'bar';
    const emitSpy = spyOn(component.changed, 'emit');

    fixture.detectChanges();

    component.search.setValue(search);

    setTimeout(() => {
      expect(emitSpy).toHaveBeenCalledTimes(1);
      expect(emitSpy).toHaveBeenCalledWith({ search });
    }, component.DEBOUNCE_TIME);
  });
});
