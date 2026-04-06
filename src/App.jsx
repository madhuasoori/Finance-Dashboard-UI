import { useState } from 'react';
import { AppLayout } from './components/AppLayout';
import { Dashboard } from './components/Dashboard';
import { Transactions } from './components/Transactions';
import { Insights } from './components/Insights';
import { Settings } from './components/Settings';

import { Profile } from './components/Profile';

function App() {
  const [activeView, setActiveView] = useState('dashboard');

  return (
    <AppLayout activeView={activeView} setActiveView={setActiveView}>
      {activeView === 'dashboard' && <Dashboard setActiveView={setActiveView} />}
      {activeView === 'transactions' && <Transactions />}
      {activeView === 'insights' && <Insights />}
      {activeView === 'settings' && <Settings />}
      {activeView === 'profile' && <Profile />}
    </AppLayout>
  );
}

export default App;
