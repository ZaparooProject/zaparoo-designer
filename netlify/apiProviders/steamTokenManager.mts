const _token = process.env.STEAMGRID_DB_APIKEY;

export const getToken = async () => {
  return _token;
};
