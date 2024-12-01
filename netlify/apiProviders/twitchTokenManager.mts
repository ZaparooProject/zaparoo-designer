let _token = '';
let _expiryDate = 0;

export const getToken = async () => {
  const time = Date.now();
  if (time + 60 > _expiryDate) {
    await refreshToken();
  }
  return _token;
};

export const refreshToken = async () => {
  console.log('refreshing token', Date.now())
  const resp = await fetch(`https://id.twitch.tv/oauth2/token?client_id=${process.env.IGDB_CLIENT_ID}&client_secret=${process.env.IGDB_CLIENT_SECRET}&grant_type=client_credentials`, {
    method: 'POST',
  });
  const data = await resp.json();
  _token = data.access_token;
  _expiryDate = Date.now() + data.expires_in;
}