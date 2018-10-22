import { TestBed } from '@angular/core/testing';
import { SettingsService, Theme, Size } from './settings.service';

fdescribe('SettingsService', () => {
  let service: SettingsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SettingsService]
    });

    service = TestBed.get(SettingsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should set default settings on creation if settings aren\'t defined', () => {
    service.theme$.subscribe(theme => {
      expect(theme).toBe(service.DEFAULT_THEME);
    });
    service.size$.subscribe(size => {
      expect(size).toBe(service.DEFAULT_SIZE);
    });
  });

  it('should be able to change theme', () => {
    const stubTheme = Theme.Dark;

    service.changeTheme(stubTheme);

    service.theme$.subscribe(theme => {
      expect(theme).toBe(stubTheme);
    });
  });

  it('should be able to change size', () => {
    const stubSize = Size.Large;

    service.changeSize(stubSize);

    service.size$.subscribe(size => {
      expect(size).toBe(stubSize);
    });
  });
});
