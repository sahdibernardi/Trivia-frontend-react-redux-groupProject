import React from 'react';
import { Route } from 'react-router-dom';
import Login from './pages/Login';
import Settings from './pages/Settings';
import Game from './pages/Game';
import Feedback from './pages/Feedback';
import Ranking from './pages/Ranking';
import './App.css';
import './CSS/login.css';
import './CSS/settings.css';
import './CSS/ranking.css';
import './CSS/question.css';
import './CSS/header.css';
import './CSS/game.css';
import './CSS/feedback.css';
import './CSS/chronometer.css';
// APP

export default function App() {
  return (
    <div className="App">
      <Route exact path="/" component={ Login } />
      <Route path="/feedback" component={ Feedback } />
      <Route path="/game" component={ Game } />
      <Route path="/ranking" component={ Ranking } />
      <Route path="/settings" component={ Settings } />
    </div>
  );
}
