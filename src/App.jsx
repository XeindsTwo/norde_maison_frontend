import {Routes, Route} from 'react-router-dom';
import HomePage from './pages/Home/HomePage.jsx';
import GenderPage from '@/pages/GenderPage/GenderPage.jsx';
import PageLoader from '@/components/PageLoader/PageLoader.jsx';
import {useRouteLoading} from '@/hooks/useRouteLoading.js';
import About from "@/pages/About/About.jsx";

function App() {
  const {loading: routeLoading} = useRouteLoading(500);

  return (
    <div>
      <PageLoader visible={routeLoading}/>
      <Routes>
        <Route path="/" element={<HomePage/>}/>
        <Route path="/about" element={<About/>}/>
        <Route path="/men" element={<GenderPage gender="M"/>}/>
        <Route path="/women" element={<GenderPage gender="F"/>}/>
      </Routes>
    </div>
  );
}

export default App;