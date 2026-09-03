import React from 'react';
import { GameView } from './components/GameView';
import './App.css';

function App() {
  return (
    <div className="App" style={{
      backgroundColor: '#000',
      width: '100vw',
      height: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      overflow: 'hidden',
      position: 'relative'
    }}>
      <GameView />
    </div>
  );
}

export default App;
