import axios from '../../libraries/axios';

export const getStatusValue = async () => {
  const { data } = await axios(true).get('/status');
  return data;
};
