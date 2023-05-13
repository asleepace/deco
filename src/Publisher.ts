
export class Publisher<T> {

  private state: T;
  private listeners: Set<(value: T) => void> = new Set();
  private ids: WeakMap<object, number> = new WeakMap();

  constructor(initialValue: T) {
    this.state = initialValue;
  }

  public get value() {
    return this.state;
  }

  public get listenersIds() {
    return this.ids
  }

  public set setState(value: T) {
    this.state = value;
    this.publish()
  }

  public publish() {
    this.listeners.forEach(listener => listener(this.state));
  }

  public subscribe(listener: (value: T) => void) {
    this.listeners.add(listener);
    this.ids.set(listener, this.hashCode(listener));
    listener(this.state);
  }

  public unsubscribe(listener: (value: T) => void) {
    this.listeners.delete(listener);
    this.ids.delete(listener);
  }

  public hashCode(value: Function): number {
    const stringValue = value.toString()
    let hash = 0, i, chr;
    if (stringValue.length === 0) throw Error('Cannot hash empty string');
    for (i = 0; i < stringValue.length; i++) {
      chr = stringValue.charCodeAt(i);
      hash = ((hash << 5) - hash) + chr;
      hash |= 0; // Convert to 32bit integer
    }
    return hash;
  }
}