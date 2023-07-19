import { useState, useEffect, useMemo } from 'react';
import {
  Lucide,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownContent,
  DropdownItem
} from '@/base-components';
import Avatar from 'react-avatar';
import DeleteModal from '@/components/delete-modal/Main';
import Pagination from '@/components/pagination/Main';
import { LoadingIcon } from '@/base-components';
import classnames from 'classnames';
import { deleteEmployer, getEmployers } from '../../api/employer';
import { useDebounce } from '../../hooks/debounce';
import { useNavigate, createSearchParams, useSearchParams, Link } from 'react-router-dom';

function Main() {
  const [searchParams] = useSearchParams();
  const [deleteConfirmationModal, setDeleteConfirmationModal] = useState(false);
  const [employers, setEmployers] = useState([]);
  const [query, setQuery] = useState('');
  const [limit, setlimit] = useState(12);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const navigate = useNavigate();
  const debouncedSearchTerm = useDebounce(query, 1000);
  const [isLoading, setIsLoading] = useState(false);
  const [deleteId, setDeleteId] = useState();

  const getEmployer = async (query) => {
    setIsLoading(true);
    try {
      const res = await getEmployers(query);
      setEmployers(res?.employers);
      setPage(res.page ?? 1);
      setlimit(res.limit ?? 12);
      setTotal(res?.total ?? 0);
    } catch (error) {
      setEmployers([]);
    }
    setIsLoading(false);
  };

  const onDeleteEmployer = async () => {
    try {
      setDeleteConfirmationModal(false);
      await deleteEmployer(deleteId);
      await getEmployer();
    } catch (error) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    getEmployer({
      limit: searchParams.get('limit'),
      page: searchParams.get('page'),
      query: searchParams.get('query')
    });
  }, [searchParams]);

  useMemo(() => {
    navigate({
      pathname: '/organization',
      search: `?${createSearchParams({
        limit,
        page,
        query
      })}`
    });
  }, [page, limit, debouncedSearchTerm]);

  return (
    <>
      <h2 className="mt-10 text-lg font-medium intro-y">Organizations</h2>
      {isLoading ? (
        <div className="flex justify-center items-center h-full">
          <LoadingIcon icon="oval" className="w-8 h-8" />
        </div>
      ) : (
        <>
          <div className="grid grid-cols-12 gap-6 mt-5">
            <div className="flex flex-wrap items-center col-span-12 mt-2 intro-y sm:flex-nowrap">
              <button className="mr-2 shadow-md btn btn-primary">Add New Organization</button>
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
                    <th className="whitespace-nowrap">ORGANIZATION</th>
                    <th className="whitespace-nowrap">CONTACT</th>
                    <th className="whitespace-nowrap">SHIFT SEEKERS</th>
                    <th className="whitespace-nowrap">RATING</th>
                    <th className="text-center whitespace-nowrap">STATUS</th>
                    <th className="text-center whitespace-nowrap">ACTIONS</th>
                  </tr>
                </thead>
                <tbody>
                  {employers?.map((employer, index) => {
                    let seekerCount = 0;
                    employer?.groups.map((item) => {
                      let count = item.shift_seeker_groups.length;
                      seekerCount += count;
                    });
                    return (
                      <tr key={index} className="intro-x">
                        <td className="w-40">
                          <div className="flex">
                            <Avatar
                              name={`${employer?.contact_name}`}
                              size="40"
                              round
                              src={employer?.organisation_logo}
                              textSizeRatio={1}
                            />
                          </div>
                        </td>
                        <td>
                          <Link
                            to={`/organization/${employer.id}`}
                            className="font-medium whitespace-nowrap">
                            {employer?.email}
                          </Link>
                          <div className="text-slate-500 text-xs whitespace-nowrap mt-0.5">
                            Phone: {employer.contact_number}
                          </div>
                        </td>
                        <td>
                          <div className="flex items-center mr-3 text-slate-500" href="#">
                            {seekerCount}
                          </div>
                        </td>
                        <td>
                          <div className="flex items-center mr-3 text-slate-500" href="#">
                            {employer.min_rating}
                          </div>
                        </td>
                        <td className="w-40">
                          <div
                            className={classnames({
                              'flex items-center justify-center': true,
                              'text-success': !employer.account_paused,
                              'text-danger': employer?.account_paused
                            })}>
                            <Lucide icon="CheckSquare" className="w-4 h-4 mr-2" />
                            {!employer?.account_paused ? 'Active' : 'Inactive'}
                          </div>
                        </td>
                        <td className="w-56 table-report__action">
                          <div className="flex items-center justify-center">
                            <Link
                              className="flex items-center mr-3"
                              to={`/organization/${employer.id}`}>
                              <Lucide icon="CheckSquare" className="w-4 h-4 mr-1" /> Edit
                            </Link>
                            <a
                              className="flex items-center text-danger"
                              href="#"
                              onClick={() => {
                                setDeleteId(employer.id);
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
              onDeleteEmployer();
            }}
          />
        </>
      )}
    </>
  );
}

export default Main;
