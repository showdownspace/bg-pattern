import { Comparator } from '@dtinth/comparator'
import { ReactElement, useState } from 'react'
import './App.css'

class DrawTransformation {
  constructor(public x: number, public y: number, public rot = 0) {}
  transform(x: number, y: number) {
    switch (this.rot) {
      case 1:
        ;[x, y] = [-y, x]
        break
      case 2:
        ;[x, y] = [-x, -y]
        break
      case 3:
        ;[x, y] = [y, -x]
        break
    }
    return [this.x + x, this.y + y]
  }
  translate(tx: number, ty: number) {
    const [x, y] = this.transform(tx, ty)
    return new DrawTransformation(x, y, this.rot)
  }
  rotate() {
    return new DrawTransformation(this.x, this.y, (this.rot + 1) % 4)
  }
  static origin() {
    return new DrawTransformation(0, 0, 0)
  }
}

class DrawCanvas {
  constructor(
    private toScreen: (x: number, y: number) => [number, number],
    private onScreen: (sx: number, sy: number) => boolean,
  ) {}
  horizontalMap = new Map<number, Set<number>>()
  verticalMap = new Map<number, Set<number>>()
  segments = 0
  line(x1: number, y1: number, x2: number, y2: number) {
    if (x1 === x2 && y1 === y2) {
      return
    }
    const [sx1, sy1] = this.toScreen(x1, y1)
    const [sx2, sy2] = this.toScreen(x2, y2)
    if (!this.onScreen(sx1, sy1) && !this.onScreen(sx2, sy2)) {
      return
    }
    if (y1 === y2) {
      if (x1 > x2) [x1, x2] = [x2, x1]
      if (x2 !== x1 + 1) {
        throw new Error('Only 1-unit wide lines are supported')
      }
      this.writeToMap(this.horizontalMap, y1, x1)
      return
    }
    if (x1 === x2) {
      if (y1 > y2) [y1, y2] = [y2, y1]
      if (y2 !== y1 + 1) {
        throw new Error('Only 1-unit wide lines are supported')
      }
      this.writeToMap(this.verticalMap, x1, y1)
      return
    }
    throw new Error('Only horizontal and vertical lines are supported')
  }
  writeToMap(map: Map<number, Set<number>>, outer: number, inner: number) {
    const set = map.get(outer)
    if (!set) {
      map.set(outer, new Set([inner]))
      this.segments++
    } else if (!set.has(inner)) {
      set.add(inner)
      this.segments++
    }
  }
  optimize(nums: Set<number>): [number, number][] {
    const output: [number, number][] = []
    let next: [number, number] | undefined
    const list = [...nums].sort(Comparator.naturalOrder())
    for (const x of list) {
      if (next && next[1] === x) {
        next[1] = x + 1
      } else {
        if (next) output.push(next)
        next = [x, x + 1]
      }
    }
    if (next) output.push(next)
    return output
  }
  toPath(): string {
    const path: string[] = []
    for (const [y, a] of this.horizontalMap) {
      for (const [x1, x2] of this.optimize(a)) {
        const [sx1, sy1] = this.toScreen(x1, y)
        const [sx2, sy2] = this.toScreen(x2, y)
        path.push(`M ${sx1} ${sy1} L ${sx2} ${sy2}`)
      }
    }
    for (const [x, a] of this.verticalMap) {
      for (const [y1, y2] of this.optimize(a)) {
        const [sx1, sy1] = this.toScreen(x, y1)
        const [sx2, sy2] = this.toScreen(x, y2)
        path.push(`M ${sx1} ${sy1} L ${sx2} ${sy2}`)
      }
    }
    return path.join(' ')
  }
}

function Bg() {
  const children: ReactElement[] = []
  const path = (d: string) => {
    children.push(<path d={d} key={children.length} />)
  }
  const width = 1920
  const height = 1080
  const canvas = new DrawCanvas(
    (x, y) => {
      const scale = 12
      let sx = (x + y) * scale
      let sy = (x - y) * scale
      sx -= height
      return [sx, sy]
    },
    (sx, sy) => sx >= 0 && sx < width && sy >= 0 && sy < height,
  )
  const template = {
    h: [
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      [0, 1, 1, 0, 0, 1, 0, 1, 0, 1, 0, 1],
      [1, 0, 0, 0, 1, 0, 1, 1, 1, 1, 1, 0],
      [0, 1, 1, 0, 0, 1, 1, 0, 1, 0, 1, 0],
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      [0, 1, 1, 0, 0, 0, 0, 1, 1, 1, 1, 0],
      [0, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1],
      [1, 0, 0, 1, 0, 1],
      [0, 1, 1, 1, 1, 0],
      [1, 0, 1, 0, 0, 0],
      [1, 1, 0, 1, 1, 0],
      [0, 0, 0, 1, 0, 1],
      [1, 1, 1, 1, 1, 1],
    ],
    v: [
      [1, 0, 0, 1, 1, 1, 0, 1, 0, 0, 1, 0, 1],
      [1, 1, 0, 1, 1, 0, 1, 0, 1, 1, 0, 1, 1],
      [1, 1, 0, 1, 1, 1, 1, 0, 1, 0, 1, 0, 1],
      [1, 0, 0, 1, 1, 0, 0, 1, 0, 1, 0, 1, 1],
      [1, 0, 1, 0, 1, 0, 1, 1, 0, 0, 0, 1, 1],
      [1, 1, 0, 1, 1, 0, 1, 0, 0, 1, 0, 0, 1],
      [1, 1, 1, 1, 1, 0, 1],
      [1, 0, 1, 1, 0, 1, 1],
      [1, 1, 0, 1, 0, 1, 1],
      [1, 0, 1, 1, 0, 1, 1],
      [1, 0, 1, 0, 1, 1, 1],
      [1, 0, 1, 1, 0, 0, 1],
    ],
  }

  function unit(size: number): number {
    if (size === 1) {
      return 6
    }
    return unit(size - 1) * 2
  }
  function draw(size: number, transform = DrawTransformation.origin()) {
    if (size === 1) {
      for (let [y, a] of template.h.entries()) {
        for (let [x, v] of a.entries()) {
          if (v) {
            line(x, y, x + 1, y, transform)
          }
        }
      }
      for (let [y, a] of template.v.entries()) {
        for (let [x, v] of a.entries()) {
          if (v) {
            line(x, y, x, y + 1, transform)
          }
        }
      }
      return
    }
    const u = unit(size - 1)
    draw(size - 1, transform)
    draw(size - 1, transform.translate(u, u))
    draw(size - 1, transform.translate(u * 4, 0).rotate())
    draw(
      size - 1,
      transform
        .translate(0, u * 4)
        .rotate()
        .rotate()
        .rotate(),
    )
  }
  function line(
    x1: number,
    y1: number,
    x2: number,
    y2: number,
    transform: DrawTransformation,
  ) {
    ;[x1, y1] = transform.transform(x1, y1)
    ;[x2, y2] = transform.transform(x2, y2)
    canvas.line(x1, y1, x2, y2)
    // path(`M ${x1 * 8 + 40} ${y1 * 8 + 30} L ${x2 * 8 + 40} ${y2 * 8 + 30}`)
  }
  console.time('draw')
  draw(7, DrawTransformation.origin())
  console.timeEnd('draw')
  console.log(canvas)

  return (
    <svg width={width} height={height} style={{ background: '#334155' }}>
      <path
        fill="none"
        stroke="#1e293b"
        strokeWidth={2}
        strokeLinecap="square"
        d={canvas.toPath()}
      />
    </svg>
  )
}

function App() {
  return (
    <div className="App">
      <Bg />
    </div>
  )
}

export default App
