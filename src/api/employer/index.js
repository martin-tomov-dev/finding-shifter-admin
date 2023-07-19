import axios from '../../libraries/axios';

export const getEmployers = async ({ limit, query, page }) => {
  const { data } = await axios(true).get(
    `/employer?limit=${limit ?? 0}&query=${query ?? ''}&page=${page ?? 0}`
  );
  return data;
};

export const getEmployerById = async (id) => {
  const { data } = await axios(true).get(`/employer/${id}`);
  return data;
};

export const updateEmployer = async (id, formData) => {
  const { data } = await axios(true).put(`/employer/${id}`, formData);
  return data;
};

export const deleteEmployer = async (id) => {
  const { data } = await axios(true).delete(`/employer/${id}`);
  return data;
};

export const updateGroup = async (id, formData) => {
  const { data } = await axios(true).put(`/group/${id}`, formData);
  return data;
};

export const deleteGroup = async (id) => {
  const { data } = await axios(true).delete(`/group/${id}`);
  return data;
};

export const createGroup = async (id, formData) => {
  const { data } = await axios(true).post('/group', {
    name: formData.name,
    organisation_id: id
  });
  return data;
};

export const addSeeker = async (id, formData) => {
  const { data } = await axios(true).post(`/group/${id}/seeker`, {
    phone_numbers: [formData.phone_number]
  });
  return data;
};

export const getShiftList = async (id) => {
  const { data } = await axios(true).get(`/shift/${id}`);
  return data;
};

export const deleteShift = async (id) => {
  const { data } = await axios(true).delete(`/shift/${id}`);
  return data;
};
