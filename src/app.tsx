import '@/styles/global.css';

import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

import Routes from 'src/routes/sections';

import { useScrollToTop } from 'src/hooks/use-scroll-to-top';

import ThemeProvider from 'src/theme/theme-provider';

import { MotionLazy } from 'src/components/animate/motion-lazy';

import { store, persistor } from './store';
import { SettingsDrawer } from './components/settings';

// ----------------------------------------------------------------------------

function App() {
  useScrollToTop();

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <ThemeProvider>
            <MotionLazy>
              <SettingsDrawer />
              <Routes />
            </MotionLazy>
          </ThemeProvider>
        </LocalizationProvider>
      </PersistGate>
    </Provider>
  );
}

export default App;
