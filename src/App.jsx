import {Routes, Route} from 'react-router-dom'
import HomePage from './pages/Home/HomePage.jsx'
import GenderPage from "@/pages/GenderPage/GenderPage.jsx";

function App() {
  return (
    <div>
      <Routes location={location}>
        <Route path="/" element={
          <HomePage/>
        }/>
        <Route path="/men" element={<GenderPage gender="M"/>}/>
        <Route path="/women" element={<GenderPage gender="F"/>}/>
      </Routes>
    </div>
  )
}

export default App