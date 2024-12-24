import { createRoot } from 'react-dom/client'
import './index.css'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import App from './App.jsx'
import { FilterProvider } from './contexts/filterContext.jsx';

const queryClient = new QueryClient();

createRoot(document.getElementById('root')).render(
  <FilterProvider>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </FilterProvider>
)
