import React from 'react';
import './App.scss';
import TweetFeed from './views/tweet-feed'

function App() {
  return (
    <div className="App">
      { /* A router of some sort could go here */}
      <TweetFeed />
    </div>
  );
}

export default App;
