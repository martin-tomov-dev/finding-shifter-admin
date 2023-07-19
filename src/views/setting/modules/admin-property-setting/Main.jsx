import React, { useEffect, useState } from 'react';
import { Lucide } from '@/base-components';
import DeleteModal from '@/components/delete-modal/Main';
import {
  createSettingValues,
  deleteSettingValues,
  getAllSettingValues,
  updateSettingValues
} from '@/api/setting';
import { useForm } from 'react-hook-form';

function Main() {
  const [values, setValues] = useState([]);
  const [selectedValue, setSelectedValue] = useState(null);
  const [action, setAction] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [loading, setLoading] = useState(false);

  const { handleSubmit, register, reset } = useForm();

  const getValues = async () => {
    try {
      setLoading(true);
      const res = await getAllSettingValues();
      setValues(res);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  useEffect(() => {
    getValues();
  }, []);

  const onSubmit = async (data) => {
    try {
      if (action === 'NEW') {
        const res = await createSettingValues(data);
        setValues(res);
        setAction(null);
      } else {
        const res = await updateSettingValues(selectedValue?.id, data);
        setValues(res);
        setSelectedValue(null);
        setAction(null);
      }
    } catch (error) {
      console.log('error: ', error);
    }
  };

  return (
    <div className="overflow-x-auto">
      <table className="table mt-5">
        <thead className="table-light">
          <tr>
            <th className="whitespace-nowrap">#</th>
            <th className="whitespace-nowrap">name</th>
            <th className="whitespace-nowrap">Key</th>
            <th className="whitespace-nowrap">Value</th>
            <th className="whitespace-nowrap">Action</th>
          </tr>
        </thead>
        <tbody>
          {values?.length > 0 &&
            values.map((value, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>
                  {value?.title?.split('_')?.join(' ')?.charAt(0)?.toUpperCase() +
                    value?.title?.split('_')?.join(' ')?.slice(1)}
                </td>
                <td>
                  {action === 'EDIT' && selectedValue?.id === value?.id ? (
                    <input
                      type="text"
                      className="form-control"
                      {...register('title', { required: true })}
                      disabled
                    />
                  ) : (
                    <p>{value?.title}</p>
                  )}
                </td>
                <td>
                  {action === 'EDIT' && selectedValue?.id === value?.id ? (
                    <input
                      type="text"
                      className="form-control"
                      {...register('value', { required: true })}
                    />
                  ) : (
                    <p>{value?.value}</p>
                  )}
                </td>
                <td>
                  {action !== 'NEW' && (
                    <>
                      {action === 'EDIT' && selectedValue?.id === value?.id ? (
                        <>
                          <button type="button" onClick={handleSubmit(onSubmit)}>
                            <Lucide icon="Check" className="w-4 h-4 ml-2 text-slate-500"></Lucide>
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              setSelectedValue(null);
                              setAction(null);
                            }}>
                            <Lucide icon="X" className="w-4 h-4 ml-2 text-slate-500"></Lucide>
                          </button>
                        </>
                      ) : (
                        <>
                          <button
                            type="button"
                            onClick={() => {
                              reset({ title: value?.title, value: value?.value });
                              setSelectedValue(value);
                              setAction('EDIT');
                            }}>
                            <Lucide icon="Edit" className="w-4 h-4 ml-2 text-slate-500" />
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              setShowDeleteModal(true);
                              setSelectedValue(value);
                              setAction('DELETE');
                            }}>
                            <Lucide icon="Trash2" className="w-4 h-4 ml-2 text-slate-500" />
                          </button>
                        </>
                      )}
                    </>
                  )}
                </td>
              </tr>
            ))}
          {action === 'NEW' && (
            <tr>
              <td></td>
              <td></td>
              <td>
                <input
                  type="text"
                  className="form-control"
                  {...register('title', { required: true })}
                />
              </td>
              <td>
                <input
                  type="text"
                  className="form-control"
                  {...register('value', { required: true })}
                />
              </td>
              <td>
                <button type="button" onClick={handleSubmit(onSubmit)}>
                  <Lucide icon="Check" className="w-4 h-4 ml-2 text-slate-500"></Lucide>
                </button>
                <button type="button" onClick={() => setAction(null)}>
                  <Lucide icon="X" className="w-4 h-4 ml-2 text-slate-500"></Lucide>
                </button>
              </td>
            </tr>
          )}
        </tbody>
      </table>
      {!action !== 'NEW' && (
        <button
          type="button"
          className="flex items-center mt-4 ml-4"
          onClick={() => {
            reset({ title: '', value: '' });
            setSelectedValue(null);
            setAction('NEW');
          }}>
          <Lucide icon="Plus" className="w-5 h-5 ml-2 mr-1 text-slate-500" />
          Add New
        </button>
      )}
      <DeleteModal
        message="Are you sure want to dalete this record?"
        show={showDeleteModal}
        setShow={setShowDeleteModal}
        onOk={async () => {
          try {
            if (selectedValue) {
              const res = await deleteSettingValues(selectedValue?.id);
              setValues(res);
              setAction(null);
              setShowDeleteModal(false);
            }
          } catch (error) {
            setAction(null);
            setShowDeleteModal(false);
          }
        }}
      />
    </div>
  );
}

export default Main;
