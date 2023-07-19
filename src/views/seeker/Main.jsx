import React, { useEffect, useMemo, useState } from 'react';
import Avatar from 'react-avatar';
import Pagination from '@/components/pagination/Main';
import ReactStars from 'react-stars';
import { LoadingIcon } from '@/base-components';
import { Link, createSearchParams, useNavigate, useSearchParams } from 'react-router-dom';
import {
  Lucide,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownContent,
  DropdownItem
} from '@/base-components';
import { getSeekers } from '../../api/seeker';
import { useDebounce } from '../../hooks/debounce';

function Main() {
  const [searchParams] = useSearchParams();
  const [seekers, setSeekers] = useState([]);
  const [query, setQuery] = useState('');
  const [limit, setlimit] = useState(12);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const debouncedSearchTerm = useDebounce(query, 1000);

  const getAllSeekers = async (query) => {
    setIsLoading(true);
    try {
      const res = await getSeekers(query);
      setSeekers(res?.seekers);
      setPage(res.page ?? 1);
      setlimit(res.limit ?? 12);
      setTotal(res?.total ?? 0);
    } catch (error) {
      setSeekers([]);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    getAllSeekers({
      limit: searchParams.get('limit'),
      page: searchParams.get('page'),
      query: searchParams.get('query')
    });
  }, [searchParams]);

  useMemo(() => {
    navigate({
      pathname: '/seekers',
      search: `?${createSearchParams({
        limit,
        page,
        query
      })}`
    });
  }, [page, limit, debouncedSearchTerm]);

  return (
    <>
      <h2 className="mt-10 text-lg font-medium intro-y">Shift Seekers</h2>
      {isLoading ? (
        <div className="flex justify-center items-center h-full">
          <LoadingIcon icon="oval" className="w-8 h-8" />
        </div>
      ) : (
        <div className="grid grid-cols-12 gap-6 mt-5">
          <div className="flex flex-wrap items-center col-span-12 mt-2 intro-y sm:flex-nowrap">
            <button className="mr-2 shadow-md btn btn-primary">Add New Seeker</button>
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
                <Lucide icon="Search" className="absolute inset-y-0 right-0 w-4 h-4 my-auto mr-3" />
              </div>
            </div>
          </div>
          {seekers?.length > 0 &&
            seekers?.map((seeker, index) => (
              <div key={index} className="col-span-12 intro-y md:col-span-6 lg:col-span-4">
                <div className="flex flex-col justify-between h-full box">
                  <div className="flex items-start flex-none px-5 pt-5">
                    <div className="flex flex-col items-center w-full lg:flex-row">
                      <Avatar
                        name={`${seeker?.first_name} ${seeker?.last_name}`}
                        size="60"
                        round
                        src={seeker?.headshot}
                      />
                      <div className="mt-3 text-center lg:ml-4 lg:text-left lg:mt-0">
                        <div className="font-medium">
                          {`${seeker.first_name} ${seeker.last_name}`}
                        </div>
                        <div className="text-slate-500 text-xs mt-0.5">
                          <ReactStars
                            count={5}
                            value={4}
                            size={24}
                            color2={'#ffd700'}
                            edit={false}
                          />
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
                            <Lucide icon="Edit2" className="w-4 h-4 mr-2" /> Edit
                          </DropdownItem>
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
                      {seeker?.email}
                    </div>
                    <div className="flex items-center justify-center mt-1 lg:justify-start text-slate-500">
                      <Lucide icon="Phone" className="w-3 h-3 mr-2" />
                      {seeker?.phone_number || 'N/A'}
                    </div>
                  </div>
                  <div className="flex-none p-5 text-center border-t lg:text-right border-slate-200/60 dark:border-darkmode-400">
                    <button className="px-2 py-1 mr-2 btn btn-primary">Message</button>
                    <Link
                      to={`/seekers/${seeker.id}`}
                      className="px-2 py-1 btn btn-outline-secondary">
                      Profile
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          <Pagination
            current={page}
            setCurrent={setPage}
            total={Math.ceil(total / limit)}
            limit={limit}
            setLimit={setlimit}
          />
        </div>
      )}
    </>
  );
}

export default Main;
