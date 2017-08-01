import React from 'react';
import { Link } from 'react-router-dom';

const Home = () =>
  <div>
    <Link to="/r/haskell">Haskell</Link>
    <Link to="/r/reactjs">ReactJs</Link>
  </div>;

export default Home;
