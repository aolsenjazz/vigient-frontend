import React, { useState } from 'react';

import { useNavigate } from 'react-router-dom';

const Navbar: React.FC = () => {
  const navigate = useNavigate();

  const changePage = (page: string) => {
    const route = page === 'main' ? '/' : `/${page}`;
    navigate(route);
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="logo">Vigient</div>
        <ul className="nav-links">
          <li onClick={() => changePage('main')}>Main</li>
          <li onClick={() => changePage('accounts')}>Accounts</li>
          <li onClick={() => changePage('sources')}>Sources</li>
          <li onClick={() => changePage('jobs')}>Jobs</li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
