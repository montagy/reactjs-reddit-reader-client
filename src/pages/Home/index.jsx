import React from 'react';
import SubReddit from '../SubReddit';

const Home = ({ match, ...props }) => {
  match.params.sub = 'Home';
  return (
    <SubReddit match={match}  {...props} />
  );
};

export default Home;
