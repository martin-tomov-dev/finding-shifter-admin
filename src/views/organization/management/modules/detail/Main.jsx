import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import { Controller, useForm } from 'react-hook-form';
import dayjs from 'dayjs';
import ReactStars from 'react-stars';
import { updateEmployer } from '../../../../../api/employer';
import { TomSelect } from '@/base-components';
import { getSkills } from '../../../../../api/common';

const detailFields = [
  {
    type: 'text',
    label: 'Organisation',
    name: 'organisation_name',
    editable: true
  },
  {
    type: 'text',
    label: 'Post code',
    name: 'postcode',
    editable: true
  },
  {
    type: 'text',
    label: 'Contact Name',
    name: 'contact_name',
    editable: true
  },
  {
    type: 'text',
    label: 'Contact number',
    name: 'contact_number',
    editable: true
  },
  {
    type: 'text',
    label: 'email',
    name: 'email',
    editable: true
  },
  {
    type: 'text',
    label: 'Hourly Rate',
    name: 'hourly_rate',
    editable: true
  },
  {
    type: 'select',
    label: 'Sector',
    name: 'sector_id',
    editable: true
  },
  {
    type: 'star',
    label: 'Min rating',
    name: 'min_rating',
    editable: true
  },
  {
    type: 'text_area',
    label: 'Shift Information',
    name: 'default_shift_information',
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
  },
  {
    type: 'text',
    label: 'Payment End Date',
    name: 'payment_period_end_date',
    editable: false
  },
  {
    type: 'text',
    label: 'Updated Date',
    name: 'updated_date',
    editable: false
  }
];

function ProfileDetail({ employer }) {
  const [userInfo, setUserInfo] = useState(employer);
  const [isEdit, setIsEdit] = useState(false);
  const [skills, setSkills] = useState([]);

  const { register, handleSubmit, reset, watch, control } = useForm({});

  const getSkillData = async () => {
    const res = await getSkills();
    setSkills(res);
  };

  const resetValues = () => {
    reset({
      organisation_name: userInfo?.organisation_name,
      postcode: userInfo?.postcode,
      contact_name: userInfo?.contact_name,
      contact_number: userInfo?.contact_number,
      email: userInfo?.email,
      hourly_rate: userInfo?.hourly_rate,
      min_rating: userInfo?.min_rating,
      default_shift_information: userInfo?.default_shift_information,
      registered_date: userInfo?.registered_date
        ? dayjs(userInfo?.registered_date).format('DD/MM/YYYY')
        : '',
      last_logged_in: userInfo?.last_logged_in
        ? dayjs(userInfo?.last_logged_in).format('DD/MM/YYYY')
        : '',
      payment_period_end_date: userInfo?.payment_period_end_date
        ? dayjs(userInfo?.payment_period_end_date).format('DD/MM/YYYY')
        : '',
      updated_date: userInfo?.updated_date
        ? dayjs(userInfo?.updated_date).format('DD/MM/YYYY')
        : '',
      account_paused: userInfo?.account_paused,
      paused_reason: userInfo?.paused_reason,
      sector_id: userInfo?.sector_id.toString()
    });
  };

  useEffect(() => {
    getSkillData();
    resetValues();
  }, []);

  useEffect(() => {
    resetValues();
  }, [userInfo]);

  const onSubmit = async (data) => {
    console.log('data: ', data);
    try {
      const res = await updateEmployer(employer.id, data);
      setUserInfo(res);
      setIsEdit(false);
    } catch (error) {
      console.error(error.message);
    }
  };

  const TextInput = ({ item }) => {
    return (
      <div className="flex items-center col-span-12 2xl:col-span-6" key={item.name}>
        <label className="flex-none w-28 mr-2">{item.label}:</label>
        <input
          type="text"
          className={classNames(
            'dark:bg-darkmode-800',
            isEdit
              ? 'mt-1 form-control'
              : 'w-full rounded-md border-none ring-0 outline-none focus:ring-0 focus:outline-none focus:border-none'
          )}
          disabled={!item.editable || !isEdit}
          {...register(item.name)}
        />
      </div>
    );
  };

  const TextArea = ({ item }) => (
    <div className="flex items-start col-span-12" key={item.name}>
      <label className="flex-none w-28 mr-2">{item?.label}:</label>
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

  const SkillSelect = ({ item }) => {
    return (
      <div className="flex items-center col-span-12 2xl:col-span-6" key={item.name}>
        <label className="flex-none w-28 mr-2">{item?.label}:</label>
        <Controller
          control={control}
          name={item.name}
          render={({ field: { onChange, value } }) => (
            <TomSelect
              value={value}
              onChange={onChange}
              className={classNames(
                'dark:bg-darkmode-800',
                isEdit
                  ? 'mt-1 form-control'
                  : 'w-full rounded-md border-none ring-0 outline-none focus:ring-0 focus:outline-none focus:border-none'
              )}
              disabled={!item.editable || !isEdit}>
              <option value="0">No Selected</option>;
              {skills?.length > 0 &&
                skills?.map((skill, index) => (
                  <option key={index} value={skill?.id}>
                    {skill?.name}
                  </option>
                ))}
            </TomSelect>
          )}
        />
      </div>
    );
  };

  const StarRating = ({ item }) => (
    <div className="flex items-center col-span-12 2xl:col-span-6" key={item.name}>
      <label className="flex-none w-28 mr-2">{item?.label}:</label>
      <ReactStars count={5} value={watch(item.name)} edit={false} size={24} color2={'#ffd700'} />
    </div>
  );

  return (
    <>
      <div className="col-span-12 intro-y box xl:col-span-6">
        <div className="flex items-center px-5 py-5 border-b sm:py-3 border-slate-200/60 dark:border-darkmode-400">
          <h2 className="mr-auto text-base font-medium">Employer Profile</h2>
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
              ) : item.type === 'text_area' ? (
                <TextArea item={item} key={item.name} />
              ) : item.type === 'select' ? (
                <SkillSelect item={item} key={item.name} />
              ) : (
                <StarRating item={item} key={item.name} />
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
          <h2 className="mr-auto text-base font-medium">Essential Documents</h2>
          <button className="hidden w-24 mr-2 btn btn-outline-secondary sm:flex">Update</button>
          <button className="hidden w-24 btn btn-outline-danger sm:flex">Delete</button>
        </div>
        <div className="w-full p-5">
          {employer?.identification ? (
            <img src={employer?.identification} className="object-cover w-full h-auto" />
          ) : (
            <h5 className="text-center">No document</h5>
          )}
        </div>
      </div>
    </>
  );
}

export default ProfileDetail;
