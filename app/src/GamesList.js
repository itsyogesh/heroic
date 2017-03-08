import React, { PropTypes } from 'react'

const GamesList = ({games}) => {
  const emptyMessage =  (
    <p>There are no games in your collection</p>
  )
  const gamesList = (
    <p>Games List</p>
  )
  return (
    <div>
      {games.length ? gamesList : emptyMessage}
    </div>
  )
}

GamesList.propTypes = {
  games: PropTypes.array.isRequired
}

export default GamesList
