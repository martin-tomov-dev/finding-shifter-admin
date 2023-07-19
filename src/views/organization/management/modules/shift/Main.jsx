import React, { useEffect, useState } from 'react';
import { LoadingIcon } from '@/base-components';
import {
  Lucide,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownContent,
  DropdownItem
} from '@/base-components';
import { deleteShift, getShiftList } from '../../../../../api/employer';
import DeleteModal from '@/components/delete-modal/Main';
import { helper } from '../../../../../utils';

const ShiftList = ({ employer }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [shiftList, setShiftList] = useState([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectShiftId, setSelectShiftId] = useState();

  const getShiftLists = async () => {
    setIsLoading(true);
    try {
      const res = await getShiftList(employer.id);
      setShiftList(res);
    } catch (error) {
      console.error(error.response.message ?? error);
    }
    setIsLoading(false);
  };

  const onDelete = async () => {
    try {
      await deleteShift(selectShiftId);
      setShowDeleteModal(false);
      getShiftLists();
    } catch (error) {
      console.error(error.response.message ?? error);
    }
  };

  useEffect(() => {
    getShiftLists();
  }, []);
  return (
    <>
      <div className="col-span-12 intro-y box">
        <div className="flex items-center py-5 border-b sm:py-5 border-slate-200/60 dark:border-darkmode-400 px-10">
          <h2 className="mr-auto text-base font-medium">Employer ShiftList</h2>
          <button onClick={() => {}} className="hidden w-24 btn btn-outline-secondary sm:flex">
            Edit
          </button>
        </div>
        {isLoading ? (
          <div className="flex justify-center items-center h-full">
            <LoadingIcon icon="oval" className="w-8 h-8" />
          </div>
        ) : (
          <div className="grid grid-cols-12 gap-6 py-5 px-10">
            <div className="flex flex-wrap items-center col-span-12 mt-2 intro-y sm:flex-nowrap">
              <button className="mr-2 shadow-md btn btn-primary">Add New Shift</button>
            </div>
            {shiftList?.length > 0 &&
              shiftList?.map((shift, index) => (
                <div key={index} className="col-span-12 intro-y md:col-span-6 lg:col-span-4">
                  <div className="flex flex-col justify-between h-full box">
                    <div className="flex items-start flex-none px-5 pt-5">
                      <div className="flex flex-col items-center w-full lg:flex-row">
                        <div className="mt-3 text-center lg:text-left lg:mt-0">
                          <p className="font-medium">
                            {helper.formatDate(shift.shift_date, 'dddd, D MMMM, YYYY')}
                          </p>
                          <div className="flex flex-row gap-5">
                            <p className="font-medium flex-1">
                              {`${helper.formatDate(shift.start_time, 'HH:mm')}-${helper.formatDate(
                                shift.end_time,
                                'HH:mm'
                              )}`}
                            </p>
                            <p className="font-medium truncate w-20">
                              {`${helper.workingTime(shift.start_time, shift.end_time)}Hours`}
                            </p>
                            <p className="font-medium">{`£${shift.gross_pay}`}</p>
                          </div>
                          <p className="font-medium truncate w-60">{shift.shift_details}</p>
                        </div>
                      </div>
                      <Dropdown className="absolute top-0 right-0 mt-3 mr-5">
                        <DropdownToggle tag="a" className="block w-5 h-5" href="#">
                          <Lucide icon="MoreHorizontal" className="w-5 h-5 text-slate-500" />
                        </DropdownToggle>
                        <DropdownMenu className="w-40">
                          <DropdownContent>
                            <DropdownItem>
                              <Lucide icon="Edit2" className="w-4 h-4 mr-2" /> Edit
                            </DropdownItem>
                            <DropdownItem
                              onClick={() => {
                                setSelectShiftId(shift.id);
                                setShowDeleteModal(true);
                              }}>
                              <Lucide icon="Trash" className="w-4 h-4 mr-2" /> Delete
                            </DropdownItem>
                          </DropdownContent>
                        </DropdownMenu>
                      </Dropdown>
                    </div>
                    <div className="flex-1 p-5 text-center lg:text-left">
                      {/* <div>{seeker?.short_bio}</div>
                    <div className="flex items-center justify-center mt-5 lg:justify-start text-slate-500">
                      <Lucide icon="Mail" className="w-3 h-3 mr-2" />
                      {seeker?.email}
                    </div> */}
                      {/* <div className="flex items-center justify-center mt-1 lg:justify-start text-slate-500">
                      <Lucide icon="Phone" className="w-3 h-3 mr-2" />
                      {seeker?.phone_number || 'N/A'}
                    </div> */}
                    </div>
                    {/* <div className="flex-none p-5 text-center border-t lg:text-right border-slate-200/60 dark:border-darkmode-400">
                      <Link to={`/seekers/`} className="px-2 py-1 btn btn-outline-secondary">
                        more views
                      </Link>
                    </div> */}
                  </div>
                </div>
              ))}
          </div>
        )}
      </div>
      <DeleteModal
        message="Are you sure want to delete this record?"
        show={showDeleteModal}
        setShow={setShowDeleteModal}
        onOk={() => onDelete()}
      />
    </>
  );
};

export default ShiftList;
