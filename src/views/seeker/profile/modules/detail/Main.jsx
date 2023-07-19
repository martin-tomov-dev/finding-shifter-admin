import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import { useForm } from 'react-hook-form';
import dayjs from 'dayjs';

const detailFields = [
  {
    type: 'text',
    label: 'First Name',
    name: 'first_name',
    editable: true
  },
  {
    type: 'text',
    label: 'Last Name',
    name: 'last_name',
    editable: true
  },
  {
    type: 'text',
    label: 'NI Number',
    name: 'ni_number',
    editable: true
  },
  {
    type: 'text',
    label: 'Birthday',
    name: 'date_of_birth',
    editable: true
  },
  {
    type: 'text',
    label: 'Postcode',
    name: 'postcode',
    editable: true
  },
  {
    type: 'text',
    label: 'CRB',
    name: 'crb',
    editable: true
  },
  {
    type: 'text_area',
    label: 'Short Bio',
    name: 'short_bio',
    editable: true
  },
  {
    type: 'text',
    label: 'Registered',
    name: 'registered_date',
    editable: false
  },
  {
    type: 'text',
    label: 'Login At',
    name: 'last_logged_in',
    editable: false
  }
];

function Main({ seeker }) {
  const [isEdit, setIsEdit] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors }
  } = useForm({});

  const resetValues = () => {
    reset({
      first_name: seeker?.first_name,
      last_name: seeker?.last_name,
      ni_number: seeker?.ni_number,
      date_of_birth: dayjs(seeker?.date_of_birth).format('DD/MM/YYYY'),
      postcode: seeker?.postcode,
      crb: seeker?.crb,
      short_bio: seeker?.short_bio,
      registered_date: dayjs(seeker?.registered_date).format('DD/MM/YYYY'),
      last_logged_in: seeker?.last_logged_in
        ? dayjs(seeker?.last_logged_in).format('DD/MM/YYYY')
        : '',
      account_paused: seeker?.account_paused,
      paused_reason: seeker?.paused_reason
    });
  };

  useEffect(() => {
    resetValues();
  }, []);

  const onSubmit = async (data) => {
    console.log('data: ', data);
  };

  const TextInput = ({ item }) => {
    return (
      <div className="flex items-center col-span-12 2xl:col-span-6" key={item.name}>
        <label className="flex-none w-20 mr-2">{item.label}:</label>
        <input
          type="text"
          className={classNames(
            'dark:bg-darkmode-800',
            isEdit
              ? 'mt-1 form-control'
              : 'rounded-md border-none ring-0 outline-none focus:ring-0 focus:outline-none focus:border-none'
          )}
          disabled={!item.editable || !isEdit}
          {...register(item.name)}
        />
      </div>
    );
  };

  const TextArea = ({ item }) => (
    <div className="flex items-start col-span-12" key={item.name}>
      <label className="flex-none w-20 mr-2">{item?.label}:</label>
      <textarea
        rows={3}
        className={classNames(
          'w-full rounded-md disabled:bg-gray-100 dark:bg-darkmode-800',
          isEdit
            ? 'border focus:border-gray-300 focus:ring-0 focus:outline-none'
            : 'border-none outline-none ring-0 focus:right-0 focus:border-none focus:ring-0'
        )}
        disabled={!item.editable || !isEdit}
        {...register(item.name)}
      />
    </div>
  );

  return (
    <>
      <div className="col-span-12 intro-y box xl:col-span-6">
        <div className="flex items-center px-5 py-5 border-b sm:py-3 border-slate-200/60 dark:border-darkmode-400">
          <h2 className="mr-auto text-base font-medium">Seeker Detail</h2>
          {!isEdit && (
            <button
              onClick={() => setIsEdit((prev) => !prev)}
              className="hidden w-24 btn btn-outline-secondary sm:flex">
              Edit
            </button>
          )}
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="p-5">
          <div className="grid grid-cols-12 gap-5">
            {detailFields.map((item) =>
              item.type === 'text' ? (
                <TextInput item={item} key={item.name} />
              ) : (
                <TextArea item={item} key={item.name} />
              )
            )}
            <div className="col-span-12">
              <div className="form-check form-switch">
                <input
                  id="account_paused"
                  className="mr-2 form-check-input dark:bg-darkmode-800"
                  type="checkbox"
                  disabled={!isEdit}
                  {...register('account_paused')}
                />
                <label className="form-check-label" htmlFor="account_paused">
                  Pause Account
                </label>
              </div>
            </div>
            <div className="flex items-start col-span-12">
              <label className="flex-none w-20 mr-2">Reason:</label>
              <textarea
                rows={3}
                className={classNames(
                  'w-full  rounded-md disabled:bg-gray-100  dark:bg-darkmode-800',
                  isEdit
                    ? 'border focus:border-gray-300 focus:ring-0 focus:outline-none'
                    : 'border-none outline-none ring-0 focus:right-0 focus:border-none focus:ring-0'
                )}
                disabled={!isEdit || !watch('account_paused')}
                {...register('paused_reason')}
              />
            </div>
          </div>
          {isEdit && (
            <div className="flex justify-center mt-5 space-x-5">
              <button
                type="button"
                className="w-32 btn btn-danger"
                onClick={() => {
                  resetValues();
                  setIsEdit(false);
                }}>
                Cancel
              </button>
              <button type="submit" className="w-32 btn btn-primary">
                OK
              </button>
            </div>
          )}
        </form>
      </div>
      <div className="col-span-12 intro-y box xl:col-span-6">
        <div className="flex items-center px-5 py-5 border-b sm:py-3 border-slate-200/60 dark:border-darkmode-400">
          <h2 className="mr-auto text-base font-medium">Identification</h2>
          <button className="hidden w-24 mr-2 btn btn-outline-secondary sm:flex">Update</button>
          <button className="hidden w-24 btn btn-outline-danger sm:flex">Delete</button>
        </div>
        <div className="w-full p-5">
          {seeker?.identification ? (
            <img src={seeker?.identification} className="object-cover w-full h-auto" />
          ) : (
            <h5 className="text-center">No passport</h5>
          )}
        </div>
      </div>
    </>
  );
}

export default Main;
