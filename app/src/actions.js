export const SET_GAMES = 'SET_GAMES'

const handleResponse = (res) => {
  if(res.ok) {
    return res.json()
  } else {
    let error = new Error(res.statusText)
    error.response = res
    throw error 
  }
}

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

export const saveGame = (data) => {
  return dispatch => {
    return fetch('http://localhost:8080/api/games', {
      method: 'post',
      body: JSON.stringify(data),
      headers: {
        "Content-Type": 'application/json'
      }
    }).then(handleResponse)
  }
}
