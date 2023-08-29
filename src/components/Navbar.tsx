import React, { useState } from 'react';

import { capitalizeFirstLetter } from '../util';

interface NavbarProps {
  setPage: (page: string) => void; // A function to change the current page in App
}

const Navbar: React.FC<NavbarProps> = ({ setPage }) => {
  const [currentPage, setCurrentPage] = useState<string>('main');
  const [navStack, setNavStack] = useState<string[]>(['main']); // Initialize the navigation stack

  const changePage = (page: string) => {
    setCurrentPage(page);
    setPage(page); // Update the parent component

    // Reset the navigation stack if navigating to 'main'
    if (page === 'main') {
      setNavStack(['main']);
    } else {
      setNavStack([...navStack, page]);
    }
  };

  const goBack = () => {
    if (navStack.length > 1) {
      const newStack = [...navStack];
      newStack.pop();
      const lastPage = newStack[newStack.length - 1];

      // Reset the navigation stack if navigating back to 'main'
      if (lastPage === 'main') {
        setNavStack(['main']);
      } else {
        setNavStack(newStack);
      }

      setCurrentPage(lastPage);
      setPage(lastPage); // Update the parent component
    }
  };

  const canGoBack = navStack.length > 1;
  return (
    <nav className="navbar">
      <div className="navbar-container">
        {canGoBack ? (
          <div className="content-left">
            <div className="go-back" onClick={goBack}>
              <svg
                fill="#FFFFFF"
                width="30px"
                height="20px"
                viewBox="0 0 52 52"
                data-name="Layer 1"
                id="Layer_1"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M50,24H6.83L27.41,3.41a2,2,0,0,0,0-2.82,2,2,0,0,0-2.82,0l-24,24a1.79,1.79,0,0,0-.25.31A1.19,1.19,0,0,0,.25,25c0,.07-.07.13-.1.2l-.06.2a.84.84,0,0,0,0,.17,2,2,0,0,0,0,.78.84.84,0,0,0,0,.17l.06.2c0,.07.07.13.1.2a1.19,1.19,0,0,0,.09.15,1.79,1.79,0,0,0,.25.31l24,24a2,2,0,1,0,2.82-2.82L6.83,28H50a2,2,0,0,0,0-4Z" />
              </svg>
              <div className="current-page-label">
                {capitalizeFirstLetter(currentPage)}
              </div>
            </div>
          </div>
        ) : (
          <div className="logo">Vigient</div>
        )}

        <ul className="nav-links">
          <li
            className={currentPage === 'main' ? 'active' : ''}
            onClick={() => changePage('main')}
          >
            Main
          </li>
          <li
            className={currentPage === 'accounts' ? 'active' : ''}
            onClick={() => changePage('accounts')}
          >
            Accounts
          </li>
          <li
            className={currentPage === 'sources' ? 'active' : ''}
            onClick={() => changePage('sources')}
          >
            Sources
          </li>
          <li
            className={currentPage === 'jobs' ? 'active' : ''}
            onClick={() => changePage('jobs')}
          >
            Jobs
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
