import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { SortComponent } from './sort.component';
import { activatedRouteStub } from 'src/tests/activated-route.stub';

describe('SortComponent', () => {
  let component: SortComponent;
  let fixture: ComponentFixture<SortComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ ReactiveFormsModule ],
      declarations: [ SortComponent ],
      providers: [
        { provide: ActivatedRoute, useValue: activatedRouteStub },
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SortComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should get sort query param value', () => {
    const route = TestBed.get(ActivatedRoute);
    const getSpy = spyOn(route.snapshot.queryParamMap, 'get');

    fixture.detectChanges();

    expect(getSpy).toHaveBeenCalledTimes(1);
    expect(getSpy).toHaveBeenCalledWith('sort');
  });

  it('should set form control value to default value when sort query param is not present', () => {
    fixture.detectChanges();

    expect(component.sort.value).toEqual(component.DEFAULT_VALUE);
  });

  it('should set form control value to sort query param when it is present', () => {
    const sortQueryParam = 'foo';
    const route = TestBed.get(ActivatedRoute);

    spyOn(route.snapshot.queryParamMap, 'get').and.returnValue(sortQueryParam);

    fixture.detectChanges();

    expect(component.sort.value).toEqual(sortQueryParam);
  });

  it('should subscribe to value change', () => {
    const subscribeSpy = spyOn(component.sort.valueChanges, 'subscribe').and.callThrough();

    fixture.detectChanges();

    expect(subscribeSpy).toHaveBeenCalledTimes(1);
  });

  it('should emit Params object with sort key value pair on value change', () => {
    const sort = 'foo';
    const emitSpy = spyOn(component.changed, 'emit');

    fixture.detectChanges();

    component.sort.setValue(sort);

    expect(emitSpy).toHaveBeenCalledTimes(1);
    expect(emitSpy).toHaveBeenCalledWith({ sort });
  });
});
