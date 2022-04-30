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
      return
    }
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
