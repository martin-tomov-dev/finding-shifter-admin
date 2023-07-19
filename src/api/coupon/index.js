import axios from '../../libraries/axios';

export const createCoupon = async (formData) => {
  const { data } = await axios(true).post('/coupon', formData);
  return data;
};

export const getCoupons = async () => {
  const { data } = await axios(true).get('/coupon');
  return data;
};

export const deleteCoupon = async (id) => {
  const { data } = await axios(true).delete(`/coupon/${id}`);
  return data;
};

export const updateCoupon = async (formData, selectedId) => {
  const { data } = await axios(true).put(`/coupon/${selectedId}`, formData);
  return data;
};
