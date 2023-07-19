import axios from '../../libraries/axios';

export const getSeekers = async ({ limit, query, page }) => {
  const { data } = await axios(true).get(
    `/seeker?limit=${limit ?? 0}&query=${query ?? ''}&page=${page ?? 0}`
  );
  return data;
};

export const getSeekerById = async (id) => {
  const { data } = await axios(true).get(`/seeker/${id}`);
  return data;
};

export const removeSeekerFromGroup = async (groupId, seekerId) => {
  const { data } = await axios(true).post(`/group/${groupId}/seeker/${seekerId}`);
  return data;
};
