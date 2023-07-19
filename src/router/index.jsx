import Dashbaord from '../views/dashboard/Main';
import ErrorPage from '../views/error-page/Main';
import Inbox from '../views/inbox/Main';
import Login from '../views/login/Main';
import Setting from '../views/setting/Main';
import OrganizationManager from '../views/organization/Main';
import OrganizationProfile from '../views/organization/management/Main';
import CouponManager from '../views/coupon/Main';
import Register from '../views/register/Main';
import SeekerManager from '../views/seeker/Main';
import SeekerProfile from '../views/seeker/profile/Main';
import SideMenu from '../layouts/side-menu/Main';
import { useRoutes, Navigate } from 'react-router-dom';

function Router() {
  const accessToken = localStorage.getItem('accessToken');
  const routes = [
    {
      path: '/',
      element: accessToken ? <SideMenu /> : <Navigate to={'/login'} replace />,
      children: [
        {
          path: '/',
          element: <Dashbaord />
        },
        {
          path: '/seekers',
          element: <SeekerManager />
        },
        {
          path: '/seekers/:id',
          element: <SeekerProfile />
        },
        {
          path: '/organization',
          element: <OrganizationManager />
        },
        {
          path: '/organization/:id',
          element: <OrganizationProfile />
        },
        {
          path: '/coupon',
          element: <CouponManager />
        },
        {
          path: '/support',
          element: <Inbox />
        },
        {
          path: '/setting',
          element: <Setting />
        }
      ]
    },
    {
      path: '/login',
      element: <Login />
    },
    {
      path: '/register',
      element: <Register />
    },
    {
      path: '/error-page',
      element: <ErrorPage />
    },
    {
      path: '*',
      element: <ErrorPage />
    }
  ];

  return useRoutes(routes);
}

export default Router;
