import { Line } from './Line';
import { IPoint, IRectangle, IRectangle2, ICircle } from '../interfaces';
import { ptsDistanceSq } from '../utils';

export class Rectangle implements IRectangle2, ICircle {
  constructor(public x: number, public y: number, public width: number, public height: number) {}

  get x2() {
    return this.x + this.width;
  }

  get y2() {
    return this.y + this.height;
  }

  get cx() {
    return this.x + this.width / 2;
  }
  get cy() {
    return this.y + this.height / 2;
  }

  get radius() {
    return Math.max(this.width, this.height) / 2;
  }

  static from(r: IRectangle) {
    return new Rectangle(r.x, r.y, r.width, r.height);
  }

  equals(that: IRectangle) {
    return this.x === that.x && this.y === that.y && this.width === that.width && this.height === that.height;
  }

  clone() {
    return new Rectangle(this.x, this.y, this.width, this.height);
  }

  add(that: IRectangle) {
    const x = Math.min(this.x, that.x);
    const y = Math.min(this.y, that.y);
    const x2 = Math.max(this.x2, that.x + that.width);
    const y2 = Math.max(this.y2, that.y + that.height);
    this.x = x;
    this.y = y;
    this.width = x2 - x;
    this.height = y2 - y;
  }

  addPoint(p: IPoint) {
    const x = Math.min(this.x, p.x);
    const y = Math.min(this.y, p.y);
    const x2 = Math.max(this.x2, p.x);
    const y2 = Math.max(this.y2, p.y);
    this.x = x;
    this.y = y;
    this.width = x2 - x;
    this.height = y2 - y;
  }

  toString() {
    return `Rectangle[x=${this.x}, y=${this.y}, w=${this.width}, h=${this.height}]`;
  }

  containsPt(px: number, py: number) {
    return px >= this.x && px <= this.x2 && py >= this.y && py <= this.y2;
  }

  get area() {
    return this.width * this.height;
  }

  intersects(that: IRectangle) {
    if (this.area <= 0 || that.width <= 0 || that.height <= 0) {
      return false;
    }
    return that.x + that.width > this.x && that.y + that.height > this.y && that.x < this.x2 && that.y < this.y2;
  }

  intersectsLine(line: Line) {
    let x1 = line.x1;
    let y1 = line.y1;
    let x2 = line.x2;
    let y2 = line.y2;
    // taken from JDK 8 java.awt.geom.Rectangle2D.Double#intersectsLine(double, double, double, double)
    const out2 = this.outcode(x2, y2);
    if (out2 === 0) {
      return true;
    }
    let out1 = this.outcode(x1, y1);
    while (out1 !== 0) {
      if ((out1 & out2) !== 0) {
        return false;
      }
      if ((out1 & (Rectangle.OUT_LEFT | Rectangle.OUT_RIGHT)) !== 0) {
        let x = this.x;
        if ((out1 & Rectangle.OUT_RIGHT) !== 0) {
          x += this.width;
        }
        y1 = y1 + ((x - x1) * (y2 - y1)) / (x2 - x1);
        x1 = x;
      } else {
        let y = this.y;
        if ((out1 & Rectangle.OUT_BOTTOM) !== 0) {
          y += this.height;
        }
        x1 = x1 + ((y - y1) * (x2 - x1)) / (y2 - y1);
        y1 = y;
      }
      out1 = this.outcode(x1, y1);
    }
    return true;
  }

  outcode(px: number, py: number) {
    // taken from JDK 8 java.awt.geom.Rectangle2D.Double#outcode(double, double)
    let out = 0;
    if (this.width <= 0) {
      out |= Rectangle.OUT_LEFT | Rectangle.OUT_RIGHT;
    } else if (px < this.x) {
      out |= Rectangle.OUT_LEFT;
    } else if (px > this.x2) {
      out |= Rectangle.OUT_RIGHT;
    }
    if (this.height <= 0) {
      out |= Rectangle.OUT_TOP | Rectangle.OUT_BOTTOM;
    } else if (py < this.y) {
      out |= Rectangle.OUT_TOP;
    } else if (py > this.y2) {
      out |= Rectangle.OUT_BOTTOM;
    }
    return out;
  }

  static readonly OUT_LEFT = 1;
  static readonly OUT_TOP = 2;
  static readonly OUT_RIGHT = 4;
  static readonly OUT_BOTTOM = 8;

  distSq(tempX: number, tempY: number) {
    // test current point to see if it is inside rectangle
    if (this.containsPt(tempX, tempY)) {
      return 0;
    }
    // which edge of rectangle is closest
    const outcode = this.outcode(tempX, tempY);
    // top
    if ((outcode & Rectangle.OUT_TOP) === Rectangle.OUT_TOP) {
      // and left
      if ((outcode & Rectangle.OUT_LEFT) === Rectangle.OUT_LEFT) {
        // linear distance from upper left corner
        return ptsDistanceSq(tempX, tempY, this.x, this.y);
      }
      if ((outcode & Rectangle.OUT_RIGHT) === Rectangle.OUT_RIGHT) {
        // and right
        // linear distance from upper right corner
        return ptsDistanceSq(tempX, tempY, this.x2, this.y);
      }
      // distance from top line segment
      return (this.y - tempY) * (this.y - tempY);
    }
    // bottom
    if ((outcode & Rectangle.OUT_BOTTOM) === Rectangle.OUT_BOTTOM) {
      // and left
      if ((outcode & Rectangle.OUT_LEFT) === Rectangle.OUT_LEFT) {
        // linear distance from lower left corner
        return ptsDistanceSq(tempX, tempY, this.x, this.y2);
      }
      // and right
      if ((outcode & Rectangle.OUT_RIGHT) === Rectangle.OUT_RIGHT) {
        // linear distance from lower right corner
        return ptsDistanceSq(tempX, tempY, this.x2, this.y2);
      }
      // distance from bottom line segment
      return (tempY - this.y2) * (tempY - this.y2);
    }
    // left only
    if ((outcode & Rectangle.OUT_LEFT) === Rectangle.OUT_LEFT) {
      // linear distance from left edge
      return (this.x - tempX) * (this.x - tempX);
    }
    // right only
    if ((outcode & Rectangle.OUT_RIGHT) === Rectangle.OUT_RIGHT) {
      // linear distance from right edge
      return (tempX - this.x2) * (tempX - this.x2);
    }
    return 0;
  }
}

export function boundingBox(path: ReadonlyArray<IPoint>) {
  if (path.length === 0) {
    return null;
  }
  const first = path[0];
  const bb = new Rectangle(first.x, first.y, 0, 0);
  for (const point of path) {
    bb.addPoint(point);
  }
  return bb;
}
