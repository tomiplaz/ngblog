import { TestBed } from '@angular/core/testing';
import { CommonService } from './common.service';
import { CoreModule } from './core.module';
import { FormGroup, FormControl } from '@angular/forms';

describe('CommonService', () => {
  let service: CommonService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [CoreModule],
      providers: [CommonService],
    });

    service = TestBed.get(CommonService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('#trackById should return object\'s id property', () => {
    const object = { id: 1 };
    const value = service.trackById(0, object);

    expect(value).toBe(object.id);
  });

  it('#getPasswordMatchValidator should return a function', () => {
    const validator = service.getPasswordMatchValidator('foo', 'bar');

    expect(typeof validator).toBe('function');
  });

  it('#getPasswordMatchValidator\'s returned validator should return validation object', () => {
    const validator = service.getPasswordMatchValidator('foo', 'bar');
    const formGroup = new FormGroup({
      foo: new FormControl('foo'),
      bar: new FormControl('bar'),
    });
    const value = validator(formGroup);

    expect(value).toEqual({ passwordMatch: true });
  });

  it('#getPasswordMatchValidator\'s returned validator should return null', () => {
    const validator = service.getPasswordMatchValidator('foo', 'bar');
    const formGroup = new FormGroup({
      foo: new FormControl('baz'),
      bar: new FormControl('baz'),
    });
    const value = validator(formGroup);

    expect(value).toBeNull();
  });
});
