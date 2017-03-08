export const SET_GAMES = 'SET_GAMES'

export const setGames = (games) => {
  return {
    type: SET_GAMES,
    games
  }
}

export const fetchGames = () => {
  return dispatch => {
    fetch('http://localhost:8080/api/games')
      .then(res => {
        return res.json()
      })
      .then(data => {
        console.log(data)
        return dispatch(setGames(data.games))
      })
  }
}
