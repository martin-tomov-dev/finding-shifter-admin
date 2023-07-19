import React, { useEffect, useState } from 'react';
import { Lucide, TabGroup, TabList, Tab, TabPanels, TabPanel } from '@/base-components';
import Avatar from 'react-avatar';
import { Link, useParams } from 'react-router-dom';
import { getEmployerById } from '../../../api/employer';
import { getSkills } from '../../../api/common';

import ProfileDetail from './modules/detail/Main';
import ProfileGroup from './modules/group/Main';
import ShiftList from './modules/shift/Main';

const Main = () => {
  const { id } = useParams();
  const [employer, setEmployer] = useState();

  const getEmployerDetail = async () => {
    const res = await getEmployerById(id);
    setEmployer(res);
  };

  const getSkill = async () => {
    await getSkills();
    // setEmployer(res);
  };

  useEffect(() => {
    getEmployerDetail();
    getSkill();
  }, []);
  return (
    <>
      <Link to="/organization" className="flex items-center mt-8 intro-y">
        <Lucide icon="ChevronsLeft" className="w-4 h-4 mr-2" />
        <h2 className="mr-auto font-medium text-md">Organization Profile</h2>
      </Link>
      {!!employer && (
        <TabGroup>
          <div className="px-5 pt-5 mt-5 intro-y box">
            <div className="flex flex-col pb-5 -mx-5 border-b lg:flex-row border-slate-200/60 dark:border-darkmode-400">
              <div className="flex items-center justify-center flex-1 px-5 lg:justify-start">
                <div className="relative flex-none w-20 h-20 sm:w-24 sm:h-24 lg:w-32 lg:h-32 image-fit">
                  <Avatar name={employer?.contact_name} round src={employer?.organisation_logo} />
                </div>
                <div className="ml-5">
                  <div className="w-24 text-lg font-medium truncate sm:w-40 sm:whitespace-normal">
                    {employer?.contact_name}
                  </div>
                  <div className="text-slate-500">Employer</div>
                </div>
              </div>
              <div className="flex-1 px-5 pt-5 mt-6 border-t border-l border-r lg:mt-0 border-slate-200/60 dark:border-darkmode-400 lg:border-t-0 lg:pt-0">
                <div className="font-medium text-center lg:text-left lg:mt-3">Contact Details</div>
                <div className="flex flex-col items-center justify-center mt-4 lg:items-start">
                  <div className="flex items-center truncate sm:whitespace-normal">
                    <Lucide icon="Mail" className="w-4 h-4 mr-2" />
                    {employer?.email}
                  </div>
                  <div className="flex items-center mt-3 truncate sm:whitespace-normal">
                    <Lucide icon="Phone" className="w-4 h-4 mr-2" />
                    {employer?.contact_number}
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-center flex-1 px-5 pt-5 mt-6 border-t lg:mt-0 lg:border-0 border-slate-200/60 dark:border-darkmode-400 lg:pt-0">
                <div className="w-20 py-3 text-center rounded-md">
                  <div className="text-xl font-medium text-primary">201</div>
                  <div className="text-slate-500">Orders</div>
                </div>
                <div className="w-20 py-3 text-center rounded-md">
                  <div className="text-xl font-medium text-primary">1k</div>
                  <div className="text-slate-500">Purchases</div>
                </div>
                <div className="w-20 py-3 text-center rounded-md">
                  <div className="text-xl font-medium text-primary">492</div>
                  <div className="text-slate-500">Reviews</div>
                </div>
              </div>
            </div>
            <TabList className="flex-col justify-center text-center nav-link-tabs sm:flex-row lg:justify-start">
              <Tab fullWidth={false} className="flex items-center py-4 cursor-pointer">
                <Lucide icon="User" className="w-4 h-4 mr-2" /> Profile
              </Tab>
              <Tab fullWidth={false} className="flex items-center py-4 cursor-pointer">
                <Lucide icon="Users" className="w-4 h-4 mr-2" /> Group
              </Tab>
              <Tab fullWidth={false} className="flex items-center py-4 cursor-pointer">
                <Lucide icon="Wrench" className="w-4 h-4 mr-2" /> Shift Lists
              </Tab>
            </TabList>
          </div>
          <TabPanels className="mt-5">
            <TabPanel>
              <div className="grid grid-cols-12 gap-6">
                <ProfileDetail employer={employer} />
              </div>
            </TabPanel>
            <TabPanel>
              <div className="grid grid-cols-12 gap-6">
                <ProfileGroup employer={employer} />
              </div>
            </TabPanel>
            <TabPanel>
              <div className="grid grid-cols-12 gap-6">
                <ShiftList employer={employer} />
              </div>
            </TabPanel>
          </TabPanels>
        </TabGroup>
      )}
    </>
  );
};

export default Main;
