import React, { useEffect, useState } from 'react';
import DeleteModal from '@/components/delete-modal/Main';
import classNames from 'classnames';
import { Lucide } from '@/base-components';
import { createSkill, deleteSkill, getSkills, updateSkill } from '../../../../api/setting';
import { useForm } from 'react-hook-form';

function Main() {
  const [skills, setSkills] = useState([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedParent, setSelectedParent] = useState(null);
  const [selectedChild, setSelectedChild] = useState(null);
  const [action, setAction] = useState(null);

  const { handleSubmit, register, reset } = useForm();

  const getAllSkills = async () => {
    try {
      const res = await getSkills();
      setSkills(res);
    } catch (error) {
      console.log('error: ', error);
    }
  };

  useEffect(() => {
    getAllSkills();
  }, []);

  const onSubmit = async (data) => {
    try {
      if (action === 'NEW') {
        const res = await createSkill({ name: data?.name, parent_skill_id: null });
        setSkills(res);
      }
      if (action === 'CNEW') {
        const res = await createSkill({ name: data?.name, parent_skill_id: selectedParent?.id });
        setSkills(res);
        setSelectedParent((prev) => res?.find((item) => item?.id === prev?.id));
      }
      if (action === 'EDIT') {
        const res = await updateSkill(selectedParent?.id, {
          name: data?.name,
          parent_skill_id: null
        });
        setSkills(res);
      }
      if (action === 'CEDIT') {
        const res = await updateSkill(selectedChild?.id, {
          name: data?.name,
          parent_skill_id: selectedParent?.id
        });
        setSkills(res);
        setSelectedParent((prev) => res?.find((item) => item?.id === prev?.id));
      }
    } catch (error) {
      console.log('error: ', error);
    }

    setAction(null);
  };

  return (
    <div className="grid grid-cols-1 gap-10 md:grid-cols-2">
      <div>
        <p className="font-bold">Parents</p>
        <div className="gap-2 p-2 mt-5">
          {skills?.length > 0 &&
            skills.map((skill, index) => (
              <a
                onClick={() => {
                  setSelectedParent(skill);
                  setAction(null);
                }}
                key={index}
                className={classNames(
                  'flex items-center justify-between p-3 transition duration-300 ease-in-out rounded-md cursor-pointer  hover:bg-slate-100 dark:hover:bg-darkmode-400',
                  selectedParent?.id === skill?.id
                    ? 'bg-slate-100 dark:bg-darkmode-400'
                    : 'bg-white dark:bg-darkmode-600'
                )}>
                <div className="max-w-[50%] truncate mr-1">
                  {action === 'EDIT' && selectedParent?.id === skill?.id ? (
                    <input
                      type="text"
                      className="form-control"
                      onClick={(e) => {
                        e.stopPropagation();
                      }}
                      {...register('name', { required: true })}
                    />
                  ) : (
                    skill?.name
                  )}
                </div>
                <div className="flex items-center">
                  {action === 'EDIT' && selectedParent?.id === skill?.id ? (
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
                          reset({ name: skill?.name });
                          setSelectedParent(skill);
                          setAction('EDIT');
                        }}>
                        <Lucide icon="Edit" className="w-4 h-4 ml-2 text-slate-500" />
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedParent(skill);
                          setShowDeleteModal(true);
                          setAction('DELETE');
                        }}>
                        <Lucide icon="Trash2" className="w-4 h-4 ml-2 text-slate-500" />
                      </button>
                    </>
                  )}
                </div>
              </a>
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
        </div>
        {action !== 'NEW' && (
          <button
            onClick={() => {
              reset({ name: '' });
              setAction('NEW');
            }}
            className="flex items-end ml-3 text-slate-500">
            <Lucide icon="Plus" className="w-4 h-4 mr-1" />
            Add New
          </button>
        )}
      </div>
      <div>
        <p className="font-bold">Children</p>
        <div className="gap-2 p-2 mt-5">
          {!!selectedParent && selectedParent?.child?.length > 0 ? (
            selectedParent?.child?.map((skill, index) => (
              <a
                onClick={() => setAction(null)}
                key={index}
                className="flex items-center justify-between p-3 transition duration-300 ease-in-out bg-white rounded-md cursor-pointer dark:bg-darkmode-600 hover:bg-slate-100 dark:hover:bg-darkmode-400">
                <div className="max-w-[50%] truncate mr-1">
                  {action === 'CEDIT' && selectedChild?.id === skill?.id ? (
                    <input
                      onClick={(e) => {
                        e.stopPropagation();
                      }}
                      type="text"
                      className="form-control"
                      {...register('name', { required: true })}
                    />
                  ) : (
                    skill?.name
                  )}
                </div>
                <div className="flex items-center">
                  {action === 'CEDIT' && selectedChild?.id === skill?.id ? (
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
                          reset({ name: skill?.name });
                          setSelectedChild(skill);
                          setAction('CEDIT');
                        }}>
                        <Lucide icon="Edit" className="w-4 h-4 ml-2 text-slate-500" />
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedChild(skill);
                          setAction('CDELETE');
                          setShowDeleteModal(true);
                        }}>
                        <Lucide icon="Trash2" className="w-4 h-4 ml-2 text-slate-500" />
                      </button>
                    </>
                  )}
                </div>
              </a>
            ))
          ) : (
            <p className="text-center text-gray-300">No children for this skill</p>
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
                    {...register('name', { required: true })}
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
        </div>
        {action !== 'CNEW' && (
          <button
            onClick={() => {
              reset({ name: '' });
              setAction('CNEW');
            }}
            className="flex items-end ml-3 text-slate-500">
            <Lucide icon="Plus" className="w-4 h-4 mr-1" />
            Add New
          </button>
        )}
      </div>
      <DeleteModal
        message="Are you sure want to dalete this record?"
        show={showDeleteModal}
        setShow={setShowDeleteModal}
        onOk={async () => {
          try {
            if (action === 'DELETE') {
              const res = await deleteSkill(selectedParent?.id);
              setSkills(res);
            } else if (action === 'CDELETE') {
              const res = await deleteSkill(selectedChild?.id);
              setSkills(res);
            }
            setShowDeleteModal(false);
            setAction(null);
          } catch (error) {
            setShowDeleteModal(false);
            setAction(null);
          }
        }}
      />
    </div>
  );
}

export default Main;
