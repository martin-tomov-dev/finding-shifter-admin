import React, { useEffect, useState } from 'react';
import Router from './router';
import ScrollToTop from '@/base-components/scroll-to-top/Main';
import { BrowserRouter } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import { userValue } from '@/stores/user';
import { refreshToken } from './api/auth';

function App() {
  const setUserValue = useSetRecoilState(userValue);

  const [isLoading, setIsLoading] = useState(true);

  const autoLogin = async (token) => {
    setIsLoading(true);
    try {
      const res = await refreshToken(token);
      localStorage.setItem('accessToken', res.access_token);
      localStorage.setItem('refreshToken', res.refresh_token);
      setUserValue(() => res);
    } catch (error) {
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      setUserValue(null);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    const token = localStorage.getItem('refreshToken');
    if (token) {
      autoLogin(token);
    } else {
      setIsLoading(false);
    }
  }, []);

  return isLoading ? null : (
    <BrowserRouter>
      <Router />
      <ScrollToTop />
    </BrowserRouter>
  );
}

export default App;
