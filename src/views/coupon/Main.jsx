import { useState, useEffect, useMemo } from 'react';
import {
  Lucide,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownContent,
  DropdownItem,
  Modal,
  ModalBody
} from '@/base-components';
import Avatar from 'react-avatar';
import DeleteModal from '@/components/delete-modal/Main';
import Pagination from '@/components/pagination/Main';
import { LoadingIcon } from '@/base-components';
import classnames from 'classnames';
import { deleteEmployer, getEmployers } from '../../api/employer';
import { useDebounce } from '../../hooks/debounce';
import { useNavigate, createSearchParams, useSearchParams, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { createCoupon, deleteCoupon, getCoupons, updateCoupon } from '../../api/coupon';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

const schema = yup.object().shape({
  cost_base_amount: yup.number().required('COST BASE AMOUNT is required'),
  cost_per_user: yup.number().required('COST PER USER is required'),
  cost_base_amount_users: yup.number().required('COST BASE AMOUNT USERS is required'),
  default_free_period_days: yup.number().required('FREE PERIOD DAYS is required'),
  limit: yup.number().required('LIMIT is required'),
  duration: yup.number().required('DURATION is required')
});

function Main() {
  const {
    register,
    formState: { errors },
    reset,
    handleSubmit
  } = useForm({ resolver: yupResolver(schema) });
  const [searchParams] = useSearchParams();
  const [deleteConfirmationModal, setDeleteConfirmationModal] = useState(false);
  const [coupons, setCoupons] = useState([]);
  const [query, setQuery] = useState('');
  const [limit, setlimit] = useState(12);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedId, setSelectedId] = useState();
  const [basicModalPreview, setBasicModalPreview] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState();

  const onSubmitCoupon = async (data) => {
    const arrayList = {
      cost_base_amount: parseFloat(data.cost_base_amount),
      cost_per_user: parseFloat(data.cost_per_user),
      cost_base_amount_users: parseInt(data.cost_base_amount_users),
      default_free_period_days: parseInt(data.default_free_period_days),
      limit: parseInt(data.limit),
      duration: parseInt(data.duration)
    };
    try {
      if (selectedEvent === 'create') {
        await createCoupon(arrayList);
      } else {
        await updateCoupon(arrayList, selectedId);
      }
      getCoupon();
      setBasicModalPreview(false);
    } catch (error) {
      console.error(error);
    }
  };

  const getCoupon = async () => {
    setIsLoading(true);
    try {
      const res = await getCoupons();
      setCoupons(res);
    } catch (error) {
      setCoupons([]);
    }
    setIsLoading(false);
  };

  const onDeleteCoupon = async () => {
    try {
      setDeleteConfirmationModal(false);
      await deleteCoupon(selectedId);
      await getCoupon();
    } catch (error) {
      console.error(error.message);
    }
  };

  const onEdit = async (editData) => {
    reset({
      cost_base_amount: editData.cost_base_amount,
      cost_per_user: editData.cost_per_user,
      cost_base_amount_users: editData.cost_base_amount_users,
      default_free_period_days: editData.default_free_period_days,
      limit: editData.limit,
      duration: editData.duration
    });
  };

  useEffect(() => {
    getCoupon();
  }, []);

  return (
    <>
      <h2 className="mt-10 text-lg font-medium intro-y">Discount Code</h2>
      {isLoading ? (
        <div className="flex justify-center items-center h-full">
          <LoadingIcon icon="oval" className="w-8 h-8" />
        </div>
      ) : (
        <>
          <div className="grid grid-cols-12 gap-6 mt-5">
            <div className="flex flex-wrap items-center col-span-12 mt-2 intro-y sm:flex-nowrap">
              <button
                className="mr-2 shadow-md btn btn-primary"
                onClick={() => {
                  setSelectedEvent('create');
                  setBasicModalPreview(true);
                  reset({
                    cost_base_amount: '',
                    cost_per_user: '',
                    cost_base_amount_users: '',
                    default_free_period_days: '',
                    limit: '',
                    duration: ''
                  });
                }}>
                Add New Coupon
              </button>
              <Dropdown>
                <DropdownToggle className="px-2 btn box">
                  <span className="flex items-center justify-center w-5 h-5">
                    <Lucide icon="Plus" className="w-4 h-4" />
                  </span>
                </DropdownToggle>
                <DropdownMenu className="w-40">
                  <DropdownContent>
                    <DropdownItem>
                      <Lucide icon="Printer" className="w-4 h-4 mr-2" /> Print
                    </DropdownItem>
                    <DropdownItem>
                      <Lucide icon="FileText" className="w-4 h-4 mr-2" /> Export to Excel
                    </DropdownItem>
                    <DropdownItem>
                      <Lucide icon="FileText" className="w-4 h-4 mr-2" /> Export to PDF
                    </DropdownItem>
                  </DropdownContent>
                </DropdownMenu>
              </Dropdown>
              <div className="hidden mx-auto md:block text-slate-500">
                Showing {(page - 1) * limit + 1} to {total < limit * page ? total : page * limit} of{' '}
                {total} entries
              </div>
              <div className="w-full mt-3 sm:w-auto sm:mt-0 sm:ml-auto md:ml-0">
                <div className="relative w-56 text-slate-500">
                  <input
                    type="text"
                    className="w-56 pr-10 form-control box"
                    placeholder="Search..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                  />
                  <Lucide
                    icon="Search"
                    className="absolute inset-y-0 right-0 w-4 h-4 my-auto mr-3"
                  />
                </div>
              </div>
            </div>
            <div className="col-span-12 overflow-auto intro-y lg:overflow-visible">
              <table className="table -mt-2 table-report">
                <thead>
                  <tr>
                    <th className="whitespace-nowrap">CODE</th>
                    <th className="whitespace-nowrap">COST BASE AMOUNT</th>
                    <th className="whitespace-nowrap">COST PER USER</th>
                    <th className="whitespace-nowrap">COST BASE AMOUNT USERS</th>
                    <th className="whitespace-nowrap">PERIOD DAYS</th>
                    <th className="whitespace-nowrap">LIMIT</th>
                    <th className="whitespace-nowrap">DURATION</th>
                    <th className="text-center whitespace-nowrap">ACTIONS</th>
                  </tr>
                </thead>
                <tbody>
                  {coupons?.map((couponData, index) => {
                    return (
                      <tr key={index} className="intro-x">
                        <td>
                          <div className="flex items-center mr-3 text-slate-500" href="#">
                            {couponData.code}
                          </div>
                        </td>
                        <td className="w-40">
                          <div className="flex">{couponData.cost_base_amount}</div>
                        </td>
                        <td className="w-40">
                          <div className="flex">{couponData.cost_per_user}</div>
                        </td>
                        <td className="w-40">
                          <div className="flex">{couponData.cost_base_amount_users}</div>
                        </td>
                        <td className="w-40">
                          <div className="flex">{couponData.default_free_period_days}</div>
                        </td>
                        <td>
                          <div className="font-medium whitespace-nowrap">{couponData?.limit}</div>
                        </td>
                        <td>
                          <div className="flex items-center mr-3 text-slate-500" href="#">
                            {couponData.duration}
                          </div>
                        </td>

                        <td className="w-56 table-report__action">
                          <div className="flex items-center justify-center">
                            <button
                              className="flex items-center mr-3"
                              onClick={() => {
                                setBasicModalPreview(true);
                                setSelectedEvent('edit');
                                setSelectedId(couponData.id);
                                onEdit(couponData);
                              }}>
                              <Lucide icon="CheckSquare" className="w-4 h-4 mr-1" /> Edit
                            </button>
                            <a
                              className="flex items-center text-danger"
                              href="#"
                              onClick={() => {
                                setSelectedId(couponData.id);
                                setDeleteConfirmationModal(true);
                              }}>
                              <Lucide icon="Trash2" className="w-4 h-4 mr-1" /> Delete
                            </a>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
              <Pagination
                current={page}
                setCurrent={setPage}
                total={Math.ceil(total / limit)}
                limit={limit}
                setLimit={setlimit}
              />
            </div>
          </div>
          <DeleteModal
            message="Are you sure want to delete this record?"
            show={deleteConfirmationModal}
            setShow={setDeleteConfirmationModal}
            onOk={async () => {
              onDeleteCoupon();
            }}
          />
        </>
      )}
      <Modal
        show={basicModalPreview}
        onHidden={() => {
          setBasicModalPreview(false);
        }}
        size="modal-lg">
        <ModalBody className="p-10">
          <form onSubmit={handleSubmit(onSubmitCoupon)}>
            <div>
              <label htmlFor="vertical-form-1" className="form-label">
                COST BASE AMOUNT
              </label>
              <input
                id="vertical-form-1"
                type="text"
                className="form-control"
                placeholder="cost base amount"
                {...register('cost_base_amount', { required: true })}
              />
              <div className="px-2 mt-1 text-xs text-danger">{errors?.balance?.message}</div>
            </div>
            <div className="mt-3">
              <label htmlFor="vertical-form-1" className="form-label">
                COST PER USER
              </label>
              <input
                id="vertical-form-1"
                type="text"
                className="form-control"
                placeholder="cost per user"
                {...register('cost_per_user', { required: true })}
              />
              <div className="px-2 mt-1 text-xs text-danger">{errors?.balance?.message}</div>
            </div>
            <div className="mt-3">
              <label htmlFor="vertical-form-1" className="form-label">
                COST BASE AMOUNT USERS
              </label>
              <input
                id="vertical-form-1"
                type="number"
                className="form-control"
                placeholder="cost base amount users"
                {...register('cost_base_amount_users', { required: true })}
              />
              <div className="px-2 mt-1 text-xs text-danger">{errors?.balance?.message}</div>
            </div>
            <div className="mt-3">
              <label htmlFor="vertical-form-1" className="form-label">
                PERIOD DAYS
              </label>
              <input
                id="vertical-form-1"
                type="number"
                className="form-control"
                placeholder="default period days"
                {...register('default_free_period_days', { required: true })}
              />
              <div className="px-2 mt-1 text-xs text-danger">{errors?.balance?.message}</div>
            </div>
            <div className="mt-3">
              <label htmlFor="vertical-form-2" className="form-label">
                LIMIT
              </label>
              <input
                id="vertical-form-2"
                type="number"
                className="form-control"
                placeholder="limit number"
                {...register('limit', { required: true })}
              />
              <div className="px-2 mt-1 text-xs text-danger">{errors?.limit?.message}</div>
            </div>

            <div className="mt-3">
              <label htmlFor="vertical-form-2" className="form-label">
                DURATION
              </label>
              <input
                id="vertical-form-2"
                type="number"
                className="form-control"
                {...register('duration', { required: true })}
                placeholder="months"
              />
              <div className="px-2 mt-1 text-xs text-danger">{errors?.duration?.message}</div>
            </div>
            <button className="btn btn-primary mt-5" type="submit">
              Save
            </button>
          </form>
        </ModalBody>
      </Modal>
      {/* END: Modal Content */}
    </>
  );
}

export default Main;
