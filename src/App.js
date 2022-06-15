import React from 'react';
import PostContext from './contexts/PostContext';
import Navigation from './Navigation';

const App = () => {
  return (
    <PostContext>
      <Navigation />
    </PostContext>
  );
};

export default App;
