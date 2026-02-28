import {Routes, Route} from "react-router-dom";
import {useRouteLoading} from "@/hooks/useRouteLoading";

import HomePage from "@/pages/Home/HomePage";
import GenderPage from "@/pages/GenderPage/GenderPage";
import CatalogPage from "@/pages/CatalogPage/CatalogPage";
import About from "@/pages/About/About";
import ProductDetailPage from "@/pages/ProductDetailPage/ProductDetailPage";

import PageLoader from "@/components/PageLoader/PageLoader";
import AuthModal from "@/components/Modals/AuthModal/AuthModal";
import SuccessModal from "@/components/Modals/AuthModal/components/SuccessModal.jsx";
import ProtectedRoute from "@/components/ProtectedRoute.jsx";
import ProfilePage from "@/pages/ProfilePage.jsx";

function App() {
  const {loading} = useRouteLoading(500);

  return (
    <div className="app-layout">
      <PageLoader visible={loading}/>

      {!loading && (
        <>
          <Routes>
            <Route path="/" element={<HomePage/>}/>
            <Route path="/about" element={<About/>}/>
            <Route path="/men" element={<GenderPage gender="M"/>}/>
            <Route path="/women" element={<GenderPage gender="F"/>}/>
            <Route path="/catalog" element={<CatalogPage/>}/>
            <Route path="/product/:id" element={<ProductDetailPage/>}/>
            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <ProfilePage/>
                </ProtectedRoute>
              }
            />
            <Route path="*" element={<HomePage/>}/>
          </Routes>

          <AuthModal/>
          <SuccessModal/>
        </>
      )}
    </div>
  );
}

export default App;