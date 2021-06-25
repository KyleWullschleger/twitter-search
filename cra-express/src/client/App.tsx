import React from 'react';
import './App.scss';
import TweetFeed from './views/tweet-feed'
import store from './store'
import { Provider } from 'react-redux'

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        { /* A router of some sort could go here */}
        <TweetFeed />
      </div>
    </Provider>
    
  );
}

export default App;
