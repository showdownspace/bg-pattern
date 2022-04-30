import { ReactElement, useState } from 'react'
import './App.css'

function Bg() {
  const children: ReactElement[] = []
  const path = (d: string) => {
    children.push(<path d={d} key={children.length} />)
  }

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

  function draw(size: number) {
    if (size === 1) {
      for (let [y, a] of template.h.entries()) {
        for (let [x, v] of a.entries()) {
          if (v) {
            line(x, y, x + 1, y)
          }
        }
      }
      for (let [y, a] of template.v.entries()) {
        for (let [x, v] of a.entries()) {
          if (v) {
            line(x, y, x, y + 1)
          }
        }
      }
    }
  }
  function line(x1: number, y1: number, x2: number, y2: number) {
    path(`M ${x1 * 16 + 8} ${y1 * 16 + 8} L ${x2 * 16 + 8} ${y2 * 16 + 8}`)
  }
  draw(1)

  return (
    <svg width={800} height={600}>
      <g fill="none" stroke="#000" strokeWidth={1} strokeLinecap="round">
        {children}
      </g>
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
