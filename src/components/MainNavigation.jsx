import React from 'react';
import { Link } from 'react-router-dom';

const MainNavigation = () => {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/auth">Authenticate</Link>
        </li>
        <li>
          <Link to="/Home">Home</Link>
        </li>
      </ul>
    </nav>
  );
};

export default MainNavigation;
