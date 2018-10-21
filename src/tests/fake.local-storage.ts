export class FakeLocalStorage implements Storage {

  [name: string]: any;

  private store: { [key: string]: string } = {};

  public lengthSpy: jasmine.Spy = spyOnProperty(localStorage, 'length').and.returnValue(this.length);
  public keySpy: jasmine.Spy = spyOn(localStorage, 'key').and.callFake(this.key.bind(this));
  public clearSpy: jasmine.Spy = spyOn(localStorage, 'clear').and.callFake(this.clear.bind(this));
  public getItemSpy: jasmine.Spy = spyOn(localStorage, 'getItem').and.callFake(this.getItem.bind(this));
  public setItemSpy: jasmine.Spy = spyOn(localStorage, 'setItem').and.callFake(this.setItem.bind(this));
  public removeItemSpy: jasmine.Spy = spyOn(localStorage, 'removeItem').and.callFake(this.removeItem.bind(this));

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
