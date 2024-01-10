import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import ImageShowCase from './components/scrollingimageshowcase/Imageshowcase'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <ImageShowCase />
    </>
  )
}

export default App
