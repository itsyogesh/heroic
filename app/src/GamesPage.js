import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { fetchGames } from './actions'

import GamesList from './GamesList'

class GamesPage extends Component {
  componentDidMount() {
    this.props.fetchGames()
  }
  render() {
    return (
      <div className='ui main container'>
        <h2 className='ui center aligned header'>GamesPage</h2>
        <GamesList games={this.props.games} />
      </div>

    )
  }
}

GamesPage.propTypes = {
  games: PropTypes.array.isRequired,
  fetchGames: PropTypes.func.isRequired
}

const mapStateToProps = (state) => {
  return {
    games: state.games
  }
}


export default connect(mapStateToProps, { fetchGames })(GamesPage)
