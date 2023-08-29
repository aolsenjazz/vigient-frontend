import React, { useState } from 'react';
import './styles/App.css';
import Main from './components/Main';
import Accounts from './components/Accounts';
import Sources from './components/Sources';
import Jobs from './components/Jobs';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

function App() {
  const [currentPage, setCurrentPage] = useState<string>('main');

  const setPage = (page: string) => {
    setCurrentPage(page);
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'main':
        return <Main />;
      case 'accounts':
        return <Accounts />;
      case 'sources':
        return <Sources />;
      case 'jobs':
        return <Jobs />;
      default:
        return <Main />;
    }
  };

  return (
    <div className="App">
      <Navbar setPage={setPage} />
      <div className="main-content">{renderPage()}</div>
      <Footer />
    </div>
  );
}

export default App;
