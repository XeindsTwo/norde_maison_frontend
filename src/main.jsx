import './index.scss';
import App from './App.jsx';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import {createRoot} from 'react-dom/client';
import {BrowserRouter} from 'react-router-dom';
import ScrollToTop from './components/ScrollToTop.jsx';
import {AuthProvider} from "@/context/AuthContext";
import {CurrencyProvider} from '@/context/CurrencyContext';
import {Notification} from "@/components/Notification/Notification";
import {SearchProvider} from "@/context/SearchContext";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 0,
      gcTime: 0,
      refetchOnWindowFocus: false
    }
  }
});

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <QueryClientProvider client={queryClient}>
      <CurrencyProvider>
        <AuthProvider>
          <SearchProvider>
            <ScrollToTop/>
            <App/>
            <Notification/>
          </SearchProvider>
        </AuthProvider>
      </CurrencyProvider>
    </QueryClientProvider>
  </BrowserRouter>
);