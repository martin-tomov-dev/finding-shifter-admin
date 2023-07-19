import { atom } from 'recoil';

const sideMenu = atom({
  key: 'sideMenu',
  default: {
    menu: [
      {
        icon: 'Home',
        pathname: '/',
        title: 'Dashboard'
      },
      {
        icon: 'User',
        pathname: '/seekers',
        title: 'Shift Seekers'
      },
      {
        icon: 'Building2',
        pathname: '/organization',
        title: 'Organization'
      },
      {
        icon: 'Tag',
        pathname: '/coupon',
        title: 'Discount Code'
      },
      {
        icon: 'PhoneCall',
        pathname: '/support',
        title: 'Support'
      },
      {
        icon: 'Settings',
        pathname: '/setting',
        title: 'Setting'
      }
    ]
  }
});

export { sideMenu };
