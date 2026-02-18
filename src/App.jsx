import {Routes, Route} from 'react-router-dom'
import HomePage from './pages/Home/HomePage.jsx'

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