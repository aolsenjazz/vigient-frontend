import React from 'react';

interface NavbarProps {
  changePage: (page: string) => void; // A function to change the current page
}

const Navbar: React.FC<NavbarProps> = ({ changePage }) => {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        {/* Logo or site name */}
        <div className="logo">Vigient</div>

        {/* Navigation links */}
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
