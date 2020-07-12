const scopes = ['user-top-read', 'user-read-currently-playing', 'user-read-playback-state'];

const spotifyAuth = 'https://accounts.spotify.com/authorize';

export const AppRoutes = {
  Authorize: `${spotifyAuth}?client_id=${
    process.env.REACT_APP_spotifyID
    }&redirect_uri=http://localhost:${process.env.REACT_APP_redirectPORT}/playlist/&scope=${scopes.join('%20')}&response_type=token&show_dialog=true`,
  Game: '/game/:playlistID',
  Login: '/',
  Playlists: '/playlist',
  Summary: '/summary',
  Scores: '/scores',
};
