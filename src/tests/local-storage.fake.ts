interface Store {
  [key: string]: string
}

interface LocalStorageSpies {
  length: jasmine.Spy,
  key: jasmine.Spy,
  clear: jasmine.Spy,
  getItem: jasmine.Spy,
  setItem: jasmine.Spy,
  removeItem: jasmine.Spy,
};

export class LocalStorageFake implements Storage {

  [name: string]: any;

  private store: Store = {};
  public spies: LocalStorageSpies = {
    length: spyOnProperty(localStorage, 'length').and.returnValue(this.length),
    key: spyOn(localStorage, 'key').and.callFake(this.key.bind(this)),
    clear: spyOn(localStorage, 'clear').and.callFake(this.clear.bind(this)),
    getItem: spyOn(localStorage, 'getItem').and.callFake(this.getItem.bind(this)),
    setItem: spyOn(localStorage, 'setItem').and.callFake(this.setItem.bind(this)),
    removeItem: spyOn(localStorage, 'removeItem').and.callFake(this.removeItem.bind(this)),
  };

  constructor() { }

  get length(): number {
    return Object.keys(this.store).length;
  }

  key(index: number): string | null {
    return Object.keys(this.store)[index] || null;
  }

  clear(): void {
    this.store = {};
  }

  getItem(key: string): string | null {
    return key in this.store ? this.store[key] : null;
  }

  setItem(key: string, value: string): void {
    this.store[key] = value;
  }

  removeItem(key: string): void {
    delete this.store[key];
  }

};
