import React from 'react';
import Avatar from 'react-avatar';
import ReactStars from 'react-stars';
import {
  Lucide,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownContent,
  DropdownItem
} from '@/base-components';

function Main({ seeker }) {
  return (
    <>
      {seeker?.shift_seeker_groups?.length > 0 &&
        seeker?.shift_seeker_groups?.map((item, index) => (
          <div key={index} className="col-span-12 intro-y md:col-span-6 lg:col-span-4">
            <div className="flex flex-col justify-between h-full box">
              <div className="flex items-start flex-none px-5 pt-5">
                <div className="flex flex-col items-center w-full lg:flex-row">
                  <Avatar
                    name={`${item?.group?.organisation?.contact_name}`}
                    size="60"
                    round
                    src={item?.group?.organisation?.organisation_logo}
                  />
                  <div className="mt-3 text-center lg:ml-4 lg:text-left lg:mt-0">
                    <div className="font-medium">{`${item.group.name}`}</div>
                    <div className="text-slate-500 text-xs mt-0.5">
                      <ReactStars count={5} value={4} size={24} color2={'#ffd700'} edit={false} />
                    </div>
                  </div>
                </div>
                <Dropdown className="absolute top-0 right-0 mt-3 mr-5">
                  <DropdownToggle tag="a" className="block w-5 h-5" href="#">
                    <Lucide icon="MoreHorizontal" className="w-5 h-5 text-slate-500" />
                  </DropdownToggle>
                  <DropdownMenu className="w-40">
                    <DropdownContent>
                      <DropdownItem>
                        <Lucide icon="Trash" className="w-4 h-4 mr-2" /> Delete
                      </DropdownItem>
                    </DropdownContent>
                  </DropdownMenu>
                </Dropdown>
              </div>
              <div className="flex-1 p-5 text-center lg:text-left">
                <div>{seeker?.short_bio}</div>
                <div className="flex items-center justify-center mt-5 lg:justify-start text-slate-500">
                  <Lucide icon="Mail" className="w-3 h-3 mr-2" />
                  {item?.group?.organisation?.email}
                </div>
                <div className="flex items-center justify-center mt-1 lg:justify-start text-slate-500">
                  <Lucide icon="Phone" className="w-3 h-3 mr-2" />
                  {item?.group?.organisation?.contact_number || 'N/A'}
                </div>
              </div>
            </div>
          </div>
        ))}
    </>
  );
}

export default Main;
