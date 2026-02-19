import {Routes, Route} from 'react-router-dom';
import HomePage from './pages/Home/HomePage.jsx';
import GenderPage from '@/pages/GenderPage/GenderPage.jsx';
import PageLoader from '@/components/PageLoader/PageLoader.jsx';
import {useRouteLoading} from '@/hooks/useRouteLoading.js';

function App() {
  const {loading: routeLoading} = useRouteLoading(650);

  return (
    <div>
      <PageLoader visible={routeLoading}/>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/men" element={<GenderPage gender="M" />} />
        <Route path="/women" element={<GenderPage gender="F" />} />
      </Routes>
    </div>
  );
}

export default App;