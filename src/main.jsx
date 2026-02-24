import './index.scss';
import App from './App.jsx';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import {createRoot} from 'react-dom/client';
import {BrowserRouter} from 'react-router-dom';
import ScrollToTop from './components/ScrollToTop.jsx';
import {AuthProvider} from "@/context/AuthContext";
import {CurrencyProvider} from '@/context/CurrencyContext';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000,
      gcTime: 10 * 60 * 1000,
      refetchOnWindowFocus: false
    }
  }
});


createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <QueryClientProvider client={queryClient}>
      <CurrencyProvider>
        <AuthProvider>
          <ScrollToTop/>
          <App/>
        </AuthProvider>
      </CurrencyProvider>
    </QueryClientProvider>
  </BrowserRouter>
);