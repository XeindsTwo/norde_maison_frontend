import {Routes, Route} from "react-router-dom";
import HomePage from "./pages/Home/HomePage.jsx";
import GenderPage from "@/pages/GenderPage/GenderPage.jsx";
import CatalogPage from "@/pages/CatalogPage/CatalogPage.jsx";
import About from "@/pages/About/About.jsx";
import ProductDetailPage from "@/pages/ProductDetailPage/ProductDetailPage.jsx";
import PageLoader from "@/components/PageLoader/PageLoader.jsx";
import AuthModal from "@/components/AuthModal/AuthModal.jsx";
import {useRouteLoading} from "@/hooks/useRouteLoading.js";
import {useAuth} from "@/context/AuthContext";

function App() {

  const {loading: routeLoading} = useRouteLoading(500);
  const {authOpen, closeAuth} = useAuth();

  return (
    <div className="app-layout">

      <PageLoader visible={routeLoading}/>

      {!routeLoading && (
        <>
          <Routes>
            <Route path="/" element={<HomePage/>}/>
            <Route path="/about" element={<About/>}/>
            <Route path="/men" element={<GenderPage gender="M"/>}/>
            <Route path="/women" element={<GenderPage gender="F"/>}/>
            <Route path="/catalog" element={<CatalogPage/>}/>
            <Route path="/product/:id" element={<ProductDetailPage/>}/>
            <Route path="*" element={<HomePage/>}/>
          </Routes>

          <AuthModal
            isOpen={authOpen}
            onClose={closeAuth}
          />
        </>
      )}

    </div>
  );
}

export default App;