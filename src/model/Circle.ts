import { ICircle } from '../interfaces';
import { ptsDistanceSq } from '../utils';

export class Circle {
  constructor(public cx: number, public cy: number, public radius: number) {}

  get x() {
    return this.cx - this.radius;
  }

  get x2() {
    return this.cx + this.radius;
  }

  get width() {
    return this.radius * 2;
  }

  get y() {
    return this.cy - this.radius;
  }

  get y2() {
    return this.cy + this.radius;
  }

  get height() {
    return this.radius * 2;
  }

  static from(r: ICircle) {
    return new Circle(r.cx, r.cy, r.radius);
  }

  containsPt(x: number, y: number) {
    return ptsDistanceSq(this.cx, this.cy, x, y) < this.radius ** this.radius;
  }
}