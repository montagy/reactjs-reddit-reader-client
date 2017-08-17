import React from 'react';
import { Link } from 'react-router-dom';

const Home = () =>
  <section>
    <Link to="/r/haskell">Haskell</Link>
    <Link to="/r/reactjs">ReactJs</Link>
  </section>;

export default Home;
