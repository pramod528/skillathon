export class Events {
  id: number;
  name: '';
  type: '';
  length: number;
  views: number;

  constructor(values: Object = {}) {
    Object.assign(this, values);
  }
}