import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Lucide,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownContent,
  DropdownItem,
  DropdownHeader,
  DropdownDivider
} from '@/base-components';
import * as $_ from 'lodash';
import classnames from 'classnames';
import logoUrl from '@/assets/images/shiftLogo.svg';
import { logout } from '@/api/auth';
import { faker as $f } from '@/utils';
import { useSetRecoilState } from 'recoil';
import { userValue } from '@/stores/user';

function Main() {
  const [searchDropdown, setSearchDropdown] = useState(false);
  const setUserValue = useSetRecoilState(userValue);
  const navigate = useNavigate();

  const showSearchDropdown = () => {
    setSearchDropdown(true);
  };
  const hideSearchDropdown = () => {
    setSearchDropdown(false);
  };

  const onLogout = async () => {
    try {
      await logout();
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      setUserValue(null);
      navigate('/login');
    } catch (error) {
      console.log('error: ', error);
    }
  };

  return (
    <>
      {/* BEGIN: Top Bar */}
      <div className="top-bar-boxed h-[70px] z-[51] relative border-b border-white/[0.08] mt-12 md:-mt-5 -mx-3 sm:-mx-8 px-3 sm:px-8 md:pt-0 mb-12">
        <div className="flex items-center h-full">
          {/* BEGIN: Logo */}
          <Link to="/" className="hidden -intro-x md:flex">
            <img alt="Shift Admin" className="w-20" src={logoUrl} />
          </Link>
          {/* END: Logo */}
          {/* BEGIN: Breadcrumb */}
          <nav aria-label="breadcrumb" className="h-full mr-auto -intro-x">
            <ol className="breadcrumb breadcrumb-light">
              <li className="breadcrumb-item">
                <a href="#">Application</a>
              </li>
              <li className="breadcrumb-item active" aria-current="page">
                Dashboard
              </li>
            </ol>
          </nav>
          {/* END: Breadcrumb */}
          {/* BEGIN: Search */}
          <div className="relative mr-3 intro-x sm:mr-6">
            <div className="hidden search sm:block">
              <input
                type="text"
                className="border-transparent search__input form-control"
                placeholder="Search..."
                onFocus={showSearchDropdown}
                onBlur={hideSearchDropdown}
              />
              <Lucide icon="Search" className="search__icon dark:text-slate-500" />
            </div>
            <a className="notification sm:hidden" href="">
              <Lucide icon="Search" className="notification__icon dark:text-slate-500" />
            </a>
            <div
              className={classnames({
                'search-result': true,
                show: searchDropdown
              })}>
              <div className="search-result__content">
                <div className="search-result__content__title">Pages</div>
                <div className="mb-5">
                  <a href="" className="flex items-center">
                    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-success/20 dark:bg-success/10 text-success">
                      <Lucide icon="Inbox" className="w-4 h-4" />
                    </div>
                    <div className="ml-3">Mail Settings</div>
                  </a>
                  <a href="" className="flex items-center mt-2">
                    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-pending/10 text-pending">
                      <Lucide icon="Users" className="w-4 h-4" />
                    </div>
                    <div className="ml-3">Users & Permissions</div>
                  </a>
                  <a href="" className="flex items-center mt-2">
                    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 dark:bg-primary/20 text-primary/80">
                      <Lucide icon="CreditCard" className="w-4 h-4" />
                    </div>
                    <div className="ml-3">Transactions Report</div>
                  </a>
                </div>
                <div className="search-result__content__title">Users</div>
                <div className="mb-5">
                  {$_.take($f(), 4).map((faker, fakerKey) => (
                    <a key={fakerKey} href="" className="flex items-center mt-2">
                      <div className="w-8 h-8 image-fit">
                        <img
                          alt="Midone Tailwind HTML Admin Template"
                          className="rounded-full"
                          src={faker.photos[0]}
                        />
                      </div>
                      <div className="ml-3">{faker.users[0].name}</div>
                      <div className="w-48 ml-auto text-xs text-right truncate text-slate-500">
                        {faker.users[0].email}
                      </div>
                    </a>
                  ))}
                </div>
                <div className="search-result__content__title">Products</div>
                {$_.take($f(), 4).map((faker, fakerKey) => (
                  <a key={fakerKey} href="" className="flex items-center mt-2">
                    <div className="w-8 h-8 image-fit">
                      <img
                        alt="Midone Tailwind HTML Admin Template"
                        className="rounded-full"
                        src={faker.images[0]}
                      />
                    </div>
                    <div className="ml-3">{faker.products[0].name}</div>
                    <div className="w-48 ml-auto text-xs text-right truncate text-slate-500">
                      {faker.products[0].category}
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </div>
          {/* END: Search */}
          {/* BEGIN: Notifications */}
          <Dropdown className="mr-4 intro-x sm:mr-6">
            <DropdownToggle
              tag="div"
              role="button"
              className="cursor-pointer notification notification--bullet">
              <Lucide icon="Bell" className="notification__icon dark:text-slate-500" />
            </DropdownToggle>
            <DropdownMenu className="pt-2 notification-content">
              <DropdownContent tag="div" className="notification-content__box">
                <div className="notification-content__title">Notifications</div>
                {$_.take($f(), 5).map((faker, fakerKey) => (
                  <div
                    key={fakerKey}
                    className={classnames({
                      'cursor-pointer relative flex items-center': true,
                      'mt-5': fakerKey
                    })}>
                    <div className="flex-none w-12 h-12 mr-1 image-fit">
                      <img
                        alt="Midone Tailwind HTML Admin Template"
                        className="rounded-full"
                        src={faker.photos[0]}
                      />
                      <div className="absolute bottom-0 right-0 w-3 h-3 border-2 border-white rounded-full bg-success dark:border-darkmode-600"></div>
                    </div>
                    <div className="ml-2 overflow-hidden">
                      <div className="flex items-center">
                        <a href="" className="mr-5 font-medium truncate">
                          {faker.users[0].name}
                        </a>
                        <div className="ml-auto text-xs text-slate-400 whitespace-nowrap">
                          {faker.times[0]}
                        </div>
                      </div>
                      <div className="w-full truncate text-slate-500 mt-0.5">
                        {faker.news[0].shortContent}
                      </div>
                    </div>
                  </div>
                ))}
              </DropdownContent>
            </DropdownMenu>
          </Dropdown>
          {/* END: Notifications */}
          {/* BEGIN: Account Menu */}
          <Dropdown className="w-8 h-8 intro-x">
            <DropdownToggle
              tag="div"
              role="button"
              className="w-8 h-8 overflow-hidden scale-110 rounded-full shadow-lg image-fit zoom-in">
              <img alt="Midone Tailwind HTML Admin Template" src={$f()[9].photos[0]} />
            </DropdownToggle>
            <DropdownMenu className="w-56">
              <DropdownContent className="bg-primary/80 before:block before:absolute before:bg-black before:inset-0 before:rounded-md before:z-[-1] text-white">
                <DropdownHeader tag="div" className="!font-normal">
                  <div className="font-medium">{$f()[0].users[0].name}</div>
                  <div className="text-xs text-white/60 mt-0.5 dark:text-slate-500">
                    {$f()[0].jobs[0]}
                  </div>
                </DropdownHeader>
                <DropdownDivider className="border-white/[0.08]" />
                <DropdownItem className="hover:bg-white/5">
                  <Lucide icon="User" className="w-4 h-4 mr-2" /> Profile
                </DropdownItem>
                <DropdownItem className="hover:bg-white/5">
                  <Lucide icon="Edit" className="w-4 h-4 mr-2" /> Add Account
                </DropdownItem>
                <DropdownItem className="hover:bg-white/5">
                  <Lucide icon="Lock" className="w-4 h-4 mr-2" /> Reset Password
                </DropdownItem>
                <DropdownItem className="hover:bg-white/5">
                  <Lucide icon="HelpCircle" className="w-4 h-4 mr-2" /> Help
                </DropdownItem>
                <DropdownDivider className="border-white/[0.08]" />
                <DropdownItem className="hover:bg-white/5">
                  <button onClick={onLogout} className="flex items-center">
                    <Lucide icon="ToggleRight" className="w-4 h-4 mr-2" /> Logout
                  </button>
                </DropdownItem>
              </DropdownContent>
            </DropdownMenu>
          </Dropdown>
          {/* END: Account Menu */}
        </div>
      </div>
      {/* END: Top Bar */}
    </>
  );
}

export default Main;
