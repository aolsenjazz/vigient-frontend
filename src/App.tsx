import React from 'react';
import './styles/App.css';
import Main from './components/Main';
import Accounts from './components/Accounts';
import Account from './components/Account';
import Sources from './components/Sources';
import Jobs from './components/Jobs';
import Schedules from './components/Schedules';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ErrorModal from './components/ErrorModal';

function App() {
  return (
    <Router>
      <div className="App">
        <ErrorModal />
        <Navbar />
        <div className="main-content">
          <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/accounts" element={<Accounts />} />
            <Route path="/account/:id" element={<Account />} />
            <Route path="/sources" element={<Sources />} />
            <Route path="/jobs" element={<Jobs />} />
            <Route path="/schedules" element={<Schedules />} />
            {/* No fallback is needed in v6, if no route matches, it'll simply not render anything */}
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
