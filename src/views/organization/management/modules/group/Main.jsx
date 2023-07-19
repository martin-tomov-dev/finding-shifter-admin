import React, { useState } from 'react';
import { Lucide } from '@/base-components';
import { useForm } from 'react-hook-form';
import classNames from 'classnames';
import DeleteModal from '@/components/delete-modal/Main';
import { Link } from 'react-router-dom';
import { addSeeker, createGroup, deleteGroup, updateGroup } from '../../../../../api/employer';
import { removeSeekerFromGroup } from '../../../../../api/seeker';

const ProfileGroup = ({ employer }) => {
  const [groupList, setGroupList] = useState(employer?.groups ?? []);
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [selectedSeeker, setSelectedSeeker] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [action, setAction] = useState(null);

  const { handleSubmit, register, reset } = useForm();

  const onSubmit = async (data) => {
    try {
      if (action === 'EDIT') {
        const res = await updateGroup(selectedGroup?.id, data);
        setGroupList(res.groups);
      } else if (action === 'NEW') {
        const res = await createGroup(employer?.id, data);
        setGroupList(res.groups);
      } else if (action === 'CNEW') {
        const res = await addSeeker(selectedGroup?.id, data);
        setGroupList(res.groups);
        setSelectedGroup(res.groups.find((item) => item.id === selectedGroup?.id));
      }
    } catch (error) {
      console.log(error);
    }
  };

  const onDelete = async () => {
    try {
      if (action === 'DELETE') {
        const res = await deleteGroup(selectedGroup?.id);
        setGroupList(res.groups);
      } else if (action === 'CDELETE') {
        const res = await removeSeekerFromGroup(selectedGroup?.id, selectedSeeker.id);
        setGroupList(res.groups);
        setSelectedGroup(res.groups.find((item) => item.id === selectedGroup?.id));
      }
      setShowDeleteModal(false);
      setAction(null);
    } catch (error) {
      console.rttpt(error.message);
    }
  };

  return (
    <>
      <div className="col-span-12 intro-y box">
        <div className="flex items-center py-5 border-b sm:py-5 border-slate-200/60 dark:border-darkmode-400 px-10">
          <h2 className="mr-auto text-base font-medium">Employer Group</h2>
        </div>
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 px-10">
          <div>
            <p className="font-bold p-2">Groups</p>

            {groupList.length > 0 &&
              groupList.map((item, index) => (
                <div
                  onClick={() => {
                    setAction(null);
                    setSelectedGroup(item);
                  }}
                  key={index}
                  className={classNames(
                    'flex items-center justify-between p-3 transition duration-300 ease-in-out rounded-md cursor-pointer dark:bg-darkmode-600 hover:bg-slate-100 dark:hover:bg-darkmode-400',
                    selectedGroup?.id === item.id
                      ? 'bg-slate-100 dark:bg-darkmode-400'
                      : 'bg-white dark:bg-darkmode-600'
                  )}>
                  <div className="max-w-[50%] truncate mr-1">
                    {action === 'EDIT' && selectedGroup?.id === item?.id ? (
                      <input
                        onClick={(e) => {
                          e.stopPropagation();
                        }}
                        type="text"
                        className="form-control"
                        {...register('name', { required: true })}
                      />
                    ) : (
                      item?.name
                    )}
                  </div>
                  <div className="flex items-center">
                    {action === 'EDIT' && selectedGroup?.id === item?.id ? (
                      <>
                        <button onClick={handleSubmit(onSubmit)}>
                          <Lucide icon="Check" className="w-4 h-4 ml-2 text-slate-500" />
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setAction(null);
                          }}>
                          <Lucide icon="X" className="w-4 h-4 ml-2 text-slate-500" />
                        </button>
                      </>
                    ) : (
                      <>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            reset({ name: item.name });
                            setSelectedGroup(item);
                            setAction('EDIT');
                          }}>
                          <Lucide icon="Edit" className="w-4 h-4 ml-2 text-slate-500" />
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedGroup(item);
                            setAction('DELETE');
                            setShowDeleteModal(true);
                          }}>
                          <Lucide icon="Trash2" className="w-4 h-4 ml-2 text-slate-500" />
                        </button>
                      </>
                    )}
                  </div>
                </div>
              ))}
            {action === 'NEW' && (
              <div
                className={classNames(
                  'flex items-center justify-between p-3 transition duration-300 ease-in-out rounded-md cursor-pointer  hover:bg-slate-100 dark:hover:bg-darkmode-400'
                )}>
                <div className="max-w-[50%] truncate mr-1">
                  {
                    <input
                      type="text"
                      className="form-control"
                      onClick={(e) => {
                        e.stopPropagation();
                      }}
                      {...register('name', { required: true })}
                    />
                  }
                </div>
                <div className="flex items-center">
                  <button onClick={handleSubmit(onSubmit)}>
                    <Lucide icon="Check" className="w-4 h-4 ml-2 text-slate-500" />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setAction(null);
                    }}>
                    <Lucide icon="X" className="w-4 h-4 ml-2 text-slate-500" />
                  </button>
                </div>
              </div>
            )}
            {action !== 'NEW' && (
              <button
                onClick={() => {
                  reset({ name: '' });
                  setAction('NEW');
                }}
                className="flex items-center ml-3 text-slate-500 py-5">
                <Lucide icon="Plus" className="w-4 h-4 mr-1" />
                Add New
              </button>
            )}
          </div>
          <div>
            <p className="font-bold p-2">Seekers</p>
            {!!selectedGroup && selectedGroup?.shift_seeker_groups?.length > 0 ? (
              selectedGroup.shift_seeker_groups.map((seeker, index) => (
                <div
                  onClick={() => setAction(null)}
                  key={index}
                  className="flex items-center justify-between p-3 transition duration-300 ease-in-out bg-white rounded-md cursor-pointer dark:bg-darkmode-600 hover:bg-slate-100 dark:hover:bg-darkmode-400">
                  <div className="max-w-[100%] truncate mr-1 grid grid-cols-3 flex-1">
                    <div className="max-w-[100%] truncate">{`${seeker?.shift_seeker?.first_name} ${seeker?.shift_seeker?.last_name}`}</div>
                    <div className="max-w-[100%] truncate">{seeker?.shift_seeker?.email}</div>
                    <div className="max-w-[100%] truncate">
                      {seeker?.shift_seeker?.phone_number}
                    </div>
                  </div>
                  <div className="flex items-center">
                    {action === 'CEDIT' && selectedSeeker?.id === seeker?.shift_seeker?.id ? (
                      <>
                        <button onClick={handleSubmit(onSubmit)}>
                          <Lucide icon="Check" className="w-4 h-4 ml-2 text-slate-500" />
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setAction(null);
                          }}>
                          <Lucide icon="X" className="w-4 h-4 ml-2 text-slate-500" />
                        </button>
                      </>
                    ) : (
                      <>
                        <Link to={`/seekers/${seeker?.shift_seeker?.id}`}>
                          <Lucide icon="Edit" className="w-4 h-4 ml-2 text-slate-500" />
                        </Link>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedSeeker(seeker?.shift_seeker);
                            setAction('CDELETE');
                            setShowDeleteModal(true);
                          }}>
                          <Lucide icon="Trash2" className="w-4 h-4 ml-2 text-slate-500" />
                        </button>
                      </>
                    )}
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center text-gray-300">No seeker for this group</p>
            )}
            {action === 'CNEW' && (
              <div
                className={classNames(
                  'flex items-center justify-between p-3 transition duration-300 ease-in-out rounded-md cursor-pointer  hover:bg-slate-100 dark:hover:bg-darkmode-400'
                )}>
                <div className="max-w-[50%] truncate mr-1">
                  {
                    <input
                      type="text"
                      className="form-control"
                      onClick={(e) => {
                        e.stopPropagation();
                      }}
                      {...register('phone_number', { required: true })}
                    />
                  }
                </div>
                <div className="flex items-center">
                  <button type="button" onClick={handleSubmit(onSubmit)}>
                    <Lucide icon="Check" className="w-4 h-4 ml-2 text-slate-500" />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setAction(null);
                    }}>
                    <Lucide icon="X" className="w-4 h-4 ml-2 text-slate-500" />
                  </button>
                </div>
              </div>
            )}
            {action !== 'CNEW' && (
              <button
                onClick={() => {
                  reset({ phone_number: '' });
                  setAction('CNEW');
                }}
                className="flex ml-3 text-slate-500 py-5 items-center">
                <Lucide icon="Plus" className="w-4 h-4 mr-1" />
                Add New
              </button>
            )}
          </div>
        </div>
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

export default ProfileGroup;
