import { TestBed } from '@angular/core/testing';
import { SettingsService, Theme, Size, SETTINGS_KEY } from './settings.service';
import { LocalStorageFake } from '../../tests/local-storage.fake';

describe('SettingsService', () => {
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

  fit('should set default settings on creation if settings aren\'t defined', () => {
    service.theme$.subscribe(theme => {
      expect(theme).toBe(service.DEFAULT_THEME);
    });
    service.size$.subscribe(size => {
      expect(size).toBe(service.DEFAULT_SIZE);
    });
  });

  describe('#changeTheme', () => {
    it('should change theme', () => {
      const stubTheme = Theme.Dark;

      service.changeTheme(stubTheme);

      service.theme$.subscribe(theme => {
        expect(theme).toBe(stubTheme);
      });
    });

    it('should save settings to local storage', () => {
      const mockLocalStorage = new LocalStorageFake();
      const stubCurrentSettings = JSON.parse(mockLocalStorage.getItem(SETTINGS_KEY));
      const stubTheme = Theme.Dark;

      service.changeTheme(stubTheme);

      expect(mockLocalStorage.spies.getItem).toHaveBeenCalledTimes(1);
      expect(mockLocalStorage.spies.getItem).toHaveBeenCalledWith(SETTINGS_KEY);
      expect(mockLocalStorage.spies.setItem).toHaveBeenCalledTimes(1);
      expect(mockLocalStorage.spies.setItem)
        .toHaveBeenCalledWith(SETTINGS_KEY, JSON.stringify({ ...stubCurrentSettings, theme: stubTheme }));
    });
  });

  describe('#changeSize', () => {
    it('should change size', () => {
      const stubSize = Size.Large;

      service.changeSize(stubSize);

      service.size$.subscribe(size => {
        expect(size).toBe(stubSize);
      });
    });

    it('should save settings to local storage', () => {
      const mockLocalStorage = new LocalStorageFake();
      const stubCurrentSettings = JSON.parse(mockLocalStorage.getItem(SETTINGS_KEY));
      const stubSize = Size.Medium;

      service.changeSize(stubSize);

      expect(mockLocalStorage.spies.getItem).toHaveBeenCalledTimes(1);
      expect(mockLocalStorage.spies.getItem).toHaveBeenCalledWith(SETTINGS_KEY);
      expect(mockLocalStorage.spies.setItem).toHaveBeenCalledTimes(1);
      expect(mockLocalStorage.spies.setItem)
        .toHaveBeenCalledWith(SETTINGS_KEY, JSON.stringify({ ...stubCurrentSettings, size: stubSize }));
    });
  });
});
