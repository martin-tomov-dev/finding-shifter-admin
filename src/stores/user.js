import { atom, selector } from 'recoil';

const userValue = atom({
  key: 'userValue',
  default: null
});

const user = selector({
  key: 'user',
  get: ({ get }) => {
    return get(userValue);
  }
});

export { userValue, user };
