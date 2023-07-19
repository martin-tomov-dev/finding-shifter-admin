import React, { useState, useEffect } from 'react';
import DeleteModal from '@/components/delete-modal/Main';
import classNames from 'classnames';
import { Lucide, TomSelect } from '@/base-components';
import { useForm } from 'react-hook-form';
import { getSkills } from '../../../../../api/common';

function Main({ seeker }) {
  const [skills, setSkills] = useState([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedParent, setSelectedParent] = useState('0');
  const [selectedChild, setSelectedChild] = useState('0');
  const [action, setAction] = useState(null);

  const { handleSubmit, reset } = useForm();

  const getSkillData = async () => {
    const res = await getSkills();
    setSelectedParent(`${res?.[0]?.child?.[0]?.parent_skill_id}`);
    setSkills(res);
  };

  useEffect(() => {
    getSkillData();
  }, []);

  const onSubmit = async (data) => {
    console.log('data: ', data);
  };

  return (
    <div className="col-span-12 intro-y box lg:col-span-9">
      <div className="flex items-center px-5 py-5 border-b sm:py-3 border-slate-200/60 dark:border-darkmode-400">
        <div className="gap-2 p-2 mt-5 w-full space-y-5">
          <TomSelect
            value={selectedParent}
            onChange={(val) => setSelectedParent(val)}
            className="w-full">
            <option value="0">No Selected</option>;
            {skills?.length > 0 &&
              skills?.map((skill, index) => (
                <option key={index} value={skill?.id}>
                  {skill?.name}
                </option>
              ))}
          </TomSelect>

          {seeker?.sector?.length > 0 &&
            seeker?.sector.map(({ skill }, index) => (
              <a
                key={index}
                className={classNames(
                  'flex items-center justify-between p-3 transition duration-300 ease-in-out rounded-md cursor-pointer  hover:bg-slate-100 dark:hover:bg-darkmode-400 bg-white dark:bg-darkmode-600'
                )}>
                <div className="mr-1 w-full">
                  <span className="truncate">{skill?.name}</span>
                </div>
                <div className="flex items-center">
                  <button
                    onClick={() => {
                      setSelectedChild(`${skill?.id}`);
                      setShowDeleteModal(true);
                      setAction('DELETE');
                    }}>
                    <Lucide icon="Trash2" className="w-4 h-4 ml-2 text-slate-500" />
                  </button>
                </div>
              </a>
            ))}
          {action === 'NEW' && selectedParent ? (
            <div
              className={classNames(
                'flex items-center justify-between p-3 transition duration-300 ease-in-out rounded-md cursor-pointer  hover:bg-slate-100 dark:hover:bg-darkmode-400'
              )}>
              <div className="w-full max-w-[50%] mr-1">
                <TomSelect
                  value={selectedChild}
                  onChange={(val) => setSelectedChild(val)}
                  className="w-full">
                  <option value="0">No Selected</option>;
                  {skills?.find((item) => item?.id === parseInt(selectedParent))?.child?.length >
                    0 &&
                    skills
                      ?.find((item) => item?.id === parseInt(selectedParent))
                      ?.child?.map((skill, index) => (
                        <option key={index} value={skill?.id}>
                          {skill?.name}
                        </option>
                      ))}
                </TomSelect>
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
          ) : (
            <button
              onClick={() => {
                reset({ name: '' });
                setAction('NEW');
              }}
              className="flex items-end ml-3 text-slate-500">
              <Lucide icon="Plus" className="w-4 h-4 mr-1" />
              <span className="leading-3">Add New</span>
            </button>
          )}
        </div>
      </div>
      <DeleteModal
        message="Are you sure want to dalete this record?"
        show={showDeleteModal}
        setShow={setShowDeleteModal}
        onOk={async () => {
          try {
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
