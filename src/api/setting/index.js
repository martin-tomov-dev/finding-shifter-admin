import axios from '../../libraries/axios';

export const getAllSettingValues = async () => {
  const { data } = await axios(true).get('/setting');
  return data;
};

export const createSettingValues = async (body) => {
  const { data } = await axios(true).post(`/setting`, body);
  return data;
};

export const updateSettingValues = async (id, body) => {
  const { data } = await axios(true).put(`/setting/${id}`, body);
  return data;
};

export const deleteSettingValues = async (id) => {
  const { data } = await axios(true).delete(`/setting/${id}`);
  return data;
};

export const getSkills = async () => {
  const { data } = await axios(true).get(`/setting/skills`);
  return data;
};

export const createSkill = async (body) => {
  const { data } = await axios(true).post(`/setting/skills`, body);
  return data;
};

export const updateSkill = async (id, body) => {
  const { data } = await axios(true).put(`/setting/skills/${id}`, body);
  return data;
};

export const deleteSkill = async (id) => {
  const { data } = await axios(true).delete(`/setting/skills/${id}`);
  return data;
};
