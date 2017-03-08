import React, { Component } from 'react'
import { Link, Match } from 'react-router'

import GamesPage from './GamesPage'
import GameForm from './GameForm'

class App extends Component {
  render() {
    return (
      <div className='ui fluid container'>
        <div className="ui fluid secondary menu">
          <div className='header item' style={{fontSize: 24}}>Heroic</div>
          <Link className='item' activeClassName='active' activeOnlyWhenExact to='/'>Home</Link>
          <Link className='item' activeClassName='active' activeOnlyWhenExact to='/games'>Games</Link>
          <div className="right menu">
            <div className='item'>
                <Link className='ui primary button' to='/games/new'>Add New Game</Link>
            </div>

          </div>
        </div>
        <Match exactly pattern='/games' component={GamesPage} />
        <Match pattern='/games/new' component={GameForm} />
      </div>
    );
  }
}

export default App
