import {createRoot} from 'react-dom/client';
import {BrowserRouter} from 'react-router-dom';
import './index.scss';

import App from './App.jsx';
import ScrollToTop from './components/ScrollToTop.jsx';

import {QueryClient, QueryClientProvider} from '@tanstack/react-query';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000,
      gcTime: 10 * 60 * 1000,
      refetchOnWindowFocus: false
    }
  }
});

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <QueryClientProvider client={queryClient}>
      <ScrollToTop/>
      <App/>
    </QueryClientProvider>
  </BrowserRouter>
);