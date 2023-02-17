export const saveToken = (token) => localStorage.setItem('token', token);

export const getToken = () => localStorage.getItem('token');

export const deletToken = () => localStorage.removeItem('token');

export const savePlayersRanking = (playersRanking) => {
  localStorage.setItem('rank', JSON.stringify(playersRanking));
};

export const getPlayersRanking = () => JSON.parse(localStorage.getItem('rank'));
