import { createRoot } from 'react-dom/client'
import './index.css'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import App from './App.jsx'
import { FilterProvider } from './contexts/filterContext.jsx';
import { Provider } from 'react-redux';
import store from './store/store.js';

const queryClient = new QueryClient();

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <FilterProvider>
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    </FilterProvider>
  </Provider>
)
