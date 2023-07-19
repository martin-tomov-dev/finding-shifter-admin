import React from 'react';
import { TabGroup, TabList, Tab, TabPanels, TabPanel } from '@/base-components';
import AdminPropertySetting from './modules/admin-property-setting/Main';
import SkillSetting from './modules/skill-setting/Main';

function Main() {
  return (
    <>
      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-12 p-10 2xl:col-span-9">
          <div className="p-10 box intro-y">
            <TabGroup>
              <TabList className="nav-tabs">
                <Tab className="w-full py-2" tag="button">
                  Admin Settings
                </Tab>
                <Tab className="w-full py-2" tag="button">
                  Skill Setting
                </Tab>
              </TabList>
              <TabPanels className="border-b border-l border-r">
                <TabPanel className="p-5 leading-relaxed">
                  <AdminPropertySetting />
                </TabPanel>
                <TabPanel className="p-5 leading-relaxed">
                  <SkillSetting />
                </TabPanel>
              </TabPanels>
            </TabGroup>
          </div>
        </div>
        <div className="col-span-12 2xl:col-span-3">
          <div className="pb-10 -mb-10">
            <div className="grid grid-cols-12 2xl:pl-6 gap-x-6 2xl:gap-x-0 gap-y-6"></div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Main;
