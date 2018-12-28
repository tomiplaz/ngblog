import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { OrderComponent } from './order.component';

fdescribe('OrderComponent', () => {
  let component: OrderComponent;
  let fixture: ComponentFixture<OrderComponent>;

  beforeEach(async(() => {
    const routeStub = {
      snapshot: {
        queryParamMap: {
          get: () => null,
        }
      }
    };

    TestBed.configureTestingModule({
      imports: [ ReactiveFormsModule ],
      declarations: [ OrderComponent ],
      providers: [
        { provide: ActivatedRoute, useValue: routeStub },
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should get order query param value', () => {
    const route = TestBed.get(ActivatedRoute);
    const getSpy = spyOn(route.snapshot.queryParamMap, 'get');

    fixture.detectChanges();

    expect(getSpy).toHaveBeenCalledTimes(1);
    expect(getSpy).toHaveBeenCalledWith('order');
  });

  it('should set form control value to default value when order query param is not present', () => {
    fixture.detectChanges();

    expect(component.order.value).toEqual('desc');
  });

  it('should set form control value to order query param when it is present', () => {
    const orderQueryParam = 'foo';
    const route = TestBed.get(ActivatedRoute);

    spyOn(route.snapshot.queryParamMap, 'get').and.returnValue(orderQueryParam);

    fixture.detectChanges();

    expect(component.order.value).toEqual(orderQueryParam);
  });

  it('should subscribe to value change', () => {
    const subscribeSpy = spyOn(component.order.valueChanges, 'subscribe');

    fixture.detectChanges();

    expect(subscribeSpy).toHaveBeenCalledTimes(1);
  });

  it('should emit Params object with order key value pair on value change', () => {
    const order = 'asc';
    const emitSpy = spyOn(component.changed, 'emit');

    fixture.detectChanges();

    component.order.setValue(order);

    expect(emitSpy).toHaveBeenCalledTimes(1);
    expect(emitSpy).toHaveBeenCalledWith({ order });
  });
});
