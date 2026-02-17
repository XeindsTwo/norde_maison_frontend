import {Routes, Route} from 'react-router-dom'
import HomePage from './pages/HomePage'

function App() {
  return (
    <div>
      <Routes location={location}>
        <Route path="/" element={
          <HomePage/>
        }/>
      </Routes>
    </div>
  )
}

export default App