import * as yup from 'yup';
import DarkModeSwitcher from '@/components/dark-mode-switcher/Main';
import dom from '@left4code/tw-starter/dist/js/dom';
import illustrationUrl from '@/assets/images/illustration.svg';
import logoUrl from '@/assets/images/shiftLogo.svg';
import { login } from '../../api/auth';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, Link } from 'react-router-dom';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { userValue, user as userStore } from '@/stores/user';
import { yupResolver } from '@hookform/resolvers/yup';

const schema = yup.object().shape({
  email: yup.string().email('Email must be a valid email').required('Email is required'),
  password: yup.string().required('Password is required')
});

function Main() {
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const setUserValue = useSetRecoilState(userValue);
  const user = useRecoilValue(userStore);

  useEffect(() => {
    dom('body').removeClass('main').removeClass('error-page').addClass('login');
    if (user) {
      navigate('/');
    }
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({ resolver: yupResolver(schema) });

  const onLogin = async (data) => {
    try {
      const res = await login(data.email, data.password);
      localStorage.setItem('accessToken', res.access_token);
      localStorage.setItem('refreshToken', res.refresh_token);
      setUserValue(() => res);
      setError('');
      navigate('/');
    } catch (error) {
      setError(error?.response?.data?.message ?? 'Something went wrong');
    }
  };

  return (
    <>
      <div>
        <DarkModeSwitcher />
        <div className="container sm:px-10">
          <div className="block grid-cols-2 gap-4 xl:grid">
            {/* BEGIN: Login Info */}
            <div className="flex-col hidden min-h-screen xl:flex">
              <a href="" className="flex items-center pt-5 -intro-x">
                <img alt="Midone Tailwind HTML Admin Template" className="w-20" src={logoUrl} />
              </a>
              <div className="my-auto">
                <img
                  alt="Midone Tailwind HTML Admin Template"
                  className="w-1/2 -mt-16 -intro-x"
                  src={illustrationUrl}
                />
                <div className="mt-10 text-4xl font-medium leading-tight text-white -intro-x">
                  A few more clicks to <br />
                  sign in to your account.
                </div>
                <div className="mt-5 text-lg text-white -intro-x text-opacity-70 dark:text-slate-400">
                  Manage all your e-commerce accounts in one place
                </div>
              </div>
            </div>
            {/* END: Login Info */}
            {/* BEGIN: Login Form */}
            <div className="flex h-screen py-5 my-10 xl:h-auto xl:py-0 xl:my-0">
              <form
                onSubmit={handleSubmit(onLogin)}
                className="w-full px-5 py-8 mx-auto my-auto bg-white rounded-md shadow-md xl:ml-20 dark:bg-darkmode-600 xl:bg-transparent sm:px-8 xl:p-0 xl:shadow-none sm:w-3/4 lg:w-2/4 xl:w-auto">
                <h2 className="text-2xl font-bold text-center intro-x xl:text-3xl xl:text-left">
                  Sign In
                </h2>
                <div className="mt-2 text-center intro-x text-slate-400 xl:hidden">
                  A few more clicks to sign in to your account. Manage all your e-commerce accounts
                  in one place
                </div>
                <div className="mt-8 intro-x">
                  <input
                    type="text"
                    className="block px-4 py-3 intro-x login__input form-control"
                    placeholder="Email"
                    {...register('email')}
                  />
                  <div className="px-2 mt-1 text-xs text-danger">{errors?.email?.message}</div>
                  <input
                    type="password"
                    className="block px-4 py-3 mt-4 intro-x login__input form-control"
                    placeholder="Password"
                    {...register('password')}
                  />
                  <div className="px-2 mt-1 text-xs text-danger">{errors?.password?.message}</div>
                </div>
                <div className="flex mt-4 text-xs intro-x text-slate-600 dark:text-slate-500 sm:text-sm">
                  <div className="flex items-center mr-auto">
                    <input
                      id="remember-me"
                      type="checkbox"
                      className="mr-2 border form-check-input"
                    />
                    <label className="cursor-pointer select-none" htmlFor="remember-me">
                      Remember me
                    </label>
                  </div>
                  <a href="">Forgot Password?</a>
                </div>
                <div className="mt-5 text-center intro-x xl:mt-8 xl:text-left">
                  <button className="w-full px-4 py-3 align-top btn btn-primary xl:w-32 xl:mr-3">
                    Login
                  </button>
                  <button className="w-full px-4 py-3 mt-3 align-top btn btn-outline-secondary xl:w-32 xl:mt-0">
                    Register
                  </button>
                </div>
                <div className="px-2 mt-2 text-xs text-danger">{error}</div>
                <div className="mt-10 text-center intro-x xl:mt-24 text-slate-600 dark:text-slate-500 xl:text-left">
                  By signin up, you agree to our
                  <a className="text-primary dark:text-slate-200" href="">
                    Terms and Conditions
                  </a>
                  &
                  <a className="text-primary dark:text-slate-200" href="">
                    Privacy Policy
                  </a>
                </div>
              </form>
            </div>
            {/* END: Login Form */}
          </div>
        </div>
      </div>
    </>
  );
}

export default Main;
