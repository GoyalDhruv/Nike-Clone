import { createRoot } from 'react-dom/client'
import './index.css'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import App from './App.jsx'
import { FilterProvider } from './contexts/filterContext.jsx';
import { Provider } from 'react-redux';
import store from './store/store.js';
import { Toaster } from 'react-hot-toast';
import { SidebarProvider } from './contexts/DashboardSidebarContext.jsx';

const queryClient = new QueryClient();

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <SidebarProvider>
      <FilterProvider>
        <QueryClientProvider client={queryClient}>
          <App />
          <Toaster />
        </QueryClientProvider>
      </FilterProvider>
    </SidebarProvider>
  </Provider>
)
