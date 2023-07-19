import axios from 'axios';

export const getSkills = async () => {
  const { data } = await axios.get(`${import.meta.env.VITE_BACKEND_ENDPOINT}/common/skill/parent`);
  return data;
};
