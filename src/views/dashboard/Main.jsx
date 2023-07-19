import {
  Lucide,
  Tippy,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownContent,
  DropdownItem,
  Litepicker,
  TinySlider
} from '@/base-components';
import { faker as $f } from '@/utils';
import * as $_ from 'lodash';
import classnames from 'classnames';
import ReportLineChart from '@/components/report-line-chart/Main';
import ReportPieChart from '@/components/report-pie-chart/Main';
import ReportDonutChart from '@/components/report-donut-chart/Main';
import ReportDonutChart1 from '@/components/report-donut-chart-1/Main';
import SimpleLineChart1 from '@/components/simple-line-chart-1/Main';
import ReportMap from '@/components/report-map/Main';
import { useRef, useState, useEffect } from 'react';
import { getStatusValue } from '../../api/dashboard';

function Main() {
  const [salesReportFilter, setSalesReportFilter] = useState();
  const [defaultStatusVal, setDefaultStatusVal] = useState();

  const uiData = [
    {
      label: 'Total Seekers',
      name: 'total_seekers',
      Icon: 'Users',
      color: 'text-pending'
    },
    {
      label: 'Seekers in Group',
      name: 'seekers_in_group',
      Icon: 'Layers',
      color: 'text-success'
    },
    {
      label: 'Total Organization',
      name: 'total_organizatio',
      Icon: 'Aperture',
      color: 'text-primary'
    },
    {
      label: 'Average lift of Seeker',
      name: 'average_lift_of_seeker',
      Icon: 'Command',
      color: 'text-danger'
    },
    {
      label: 'Total available Shift',
      name: 'total_available_shift',
      Icon: 'Database',
      color: 'text-success'
    },
    {
      label: 'Total accepted shift',
      name: 'total_accepted_shift',
      Icon: 'CheckSquare',
      color: 'text-danger'
    },
    {
      label: 'Accepted shift per seeker',
      name: 'average_accepted_shift_per_seeker',
      Icon: 'CheckCircle',
      color: 'text-pending'
    },
    {
      label: 'Average shifts per organization',
      name: 'average_accepted_shifts_per_organization',
      Icon: 'LifeBuoy',
      color: 'text-primary'
    },
    {
      label: 'Last 3months revenue',
      name: 'last_3months_revenue',
      Icon: 'ChevronsLeft',
      color: 'text-danger'
    },
    {
      label: 'Next month revenue',
      name: 'next_month_revenue',
      Icon: 'ChevronsRight',
      color: 'text-danger'
    },
    {
      label: 'Number of deleted account',
      name: 'number_of_deleted_account',
      Icon: 'Trash2',
      color: 'text-primary'
    },
    {
      label: 'Number of payment issued account',
      name: 'number_of_payment_issued_account',
      Icon: 'Paperclip',
      color: 'text-pending'
    }
  ];

  const getDefaultVal = async () => {
    const data = await getStatusValue();
    setDefaultStatusVal(data);
  };

  useEffect(() => {
    getDefaultVal();
  }, []);

  return (
    // <div className="grid grid-cols-12 gap-6">
    <div className="col-span-12 2xl:col-span-12">
      <div className="grid grid-cols-12 gap-6">
        {/* BEGIN: General Report */}
        <div className="col-span-12 mt-8">
          <div className="flex items-center h-10 intro-y">
            <h2 className="mr-5 text-lg font-medium truncate">General Report</h2>
            <a href="" className="flex items-center ml-auto text-primary">
              <Lucide icon="RefreshCcw" className="w-4 h-4 mr-3" /> Reload Data
            </a>
          </div>
          <div className="grid grid-cols-12 gap-6 mt-5">
            {uiData?.map((content, index) => (
              <div className="col-span-12 sm:col-span-6 xl:col-span-3 intro-y" key={index}>
                <div className="report-box zoom-in">
                  <div className="p-5 box">
                    <Lucide
                      icon={content.Icon}
                      className={classnames('report-box__icon', content?.color)}
                    />
                    <div className="mt-6 text-3xl font-medium leading-8">
                      {!!defaultStatusVal && defaultStatusVal[content.name]}
                    </div>
                    <div className="mt-1 text-base text-slate-500">{content.label}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        {/* END: General Report */}
        {/* BEGIN: Sales Report */}
        <div className="col-span-12 mt-8 lg:col-span-6">
          <div className="items-center block h-10 intro-y sm:flex">
            <h2 className="mr-5 text-lg font-medium truncate">Sales Report</h2>
            <div className="relative mt-3 sm:ml-auto sm:mt-0 text-slate-500">
              <Lucide
                icon="Calendar"
                className="absolute inset-y-0 left-0 z-10 w-4 h-4 my-auto ml-3"
              />
              <Litepicker
                value={salesReportFilter}
                onChange={setSalesReportFilter}
                options={{
                  autoApply: false,
                  singleMode: false,
                  numberOfColumns: 2,
                  numberOfMonths: 2,
                  showWeekNumbers: true,
                  dropdowns: {
                    minYear: 1990,
                    maxYear: null,
                    months: true,
                    years: true
                  }
                }}
                className="pl-10 form-control sm:w-56 box"
              />
            </div>
          </div>
          <div className="p-5 mt-12 intro-y box sm:mt-5">
            <div className="flex flex-col md:flex-row md:items-center">
              <div className="flex">
                <div>
                  <div className="text-lg font-medium text-primary dark:text-slate-300 xl:text-xl">
                    $15,000
                  </div>
                  <div className="mt-0.5 text-slate-500">This Month</div>
                </div>
                <div className="w-px h-12 mx-4 border border-r border-dashed border-slate-200 dark:border-darkmode-300 xl:mx-5"></div>
                <div>
                  <div className="text-lg font-medium text-slate-500 xl:text-xl">$10,000</div>
                  <div className="mt-0.5 text-slate-500">Last Month</div>
                </div>
              </div>
              <Dropdown className="mt-5 md:ml-auto md:mt-0">
                <DropdownToggle className="font-normal btn btn-outline-secondary">
                  Filter by Category
                  <Lucide icon="ChevronDown" className="w-4 h-4 ml-2" />
                </DropdownToggle>
                <DropdownMenu className="w-40">
                  <DropdownContent className="h-32 overflow-y-auto">
                    <DropdownItem>PC & Laptop</DropdownItem>
                    <DropdownItem>Smartphone</DropdownItem>
                    <DropdownItem>Electronic</DropdownItem>
                    <DropdownItem>Photography</DropdownItem>
                    <DropdownItem>Sport</DropdownItem>
                  </DropdownContent>
                </DropdownMenu>
              </Dropdown>
            </div>
            <div className="report-chart">
              <ReportLineChart height={275} className="mt-6 -mb-6" />
            </div>
          </div>
        </div>
        {/* END: Sales Report */}
        {/* BEGIN: Weekly Top Seller */}
        <div className="col-span-12 mt-8 sm:col-span-6 lg:col-span-3">
          <div className="flex items-center h-10 intro-y">
            <h2 className="mr-5 text-lg font-medium truncate">Weekly Top Seller</h2>
            <a href="" className="ml-auto truncate text-primary">
              Show More
            </a>
          </div>
          <div className="p-5 mt-5 intro-y box">
            <div className="mt-3">
              <ReportPieChart height={213} />
            </div>
            <div className="mx-auto mt-8 w-52 sm:w-auto">
              <div className="flex items-center">
                <div className="w-2 h-2 mr-3 rounded-full bg-primary"></div>
                <span className="truncate">17 - 30 Years old</span>
                <span className="ml-auto font-medium">62%</span>
              </div>
              <div className="flex items-center mt-4">
                <div className="w-2 h-2 mr-3 rounded-full bg-pending"></div>
                <span className="truncate">31 - 50 Years old</span>
                <span className="ml-auto font-medium">33%</span>
              </div>
              <div className="flex items-center mt-4">
                <div className="w-2 h-2 mr-3 rounded-full bg-warning"></div>
                <span className="truncate">&gt;= 50 Years old</span>
                <span className="ml-auto font-medium">10%</span>
              </div>
            </div>
          </div>
        </div>
        {/* END: Weekly Top Seller */}
        {/* BEGIN: Sales Report */}
        <div className="col-span-12 mt-8 sm:col-span-6 lg:col-span-3">
          <div className="flex items-center h-10 intro-y">
            <h2 className="mr-5 text-lg font-medium truncate">Sales Report</h2>
            <a href="" className="ml-auto truncate text-primary">
              Show More
            </a>
          </div>
          <div className="p-5 mt-5 intro-y box">
            <div className="mt-3">
              <ReportDonutChart height={213} />
            </div>
            <div className="mx-auto mt-8 w-52 sm:w-auto">
              <div className="flex items-center">
                <div className="w-2 h-2 mr-3 rounded-full bg-primary"></div>
                <span className="truncate">17 - 30 Years old</span>
                <span className="ml-auto font-medium">62%</span>
              </div>
              <div className="flex items-center mt-4">
                <div className="w-2 h-2 mr-3 rounded-full bg-pending"></div>
                <span className="truncate">31 - 50 Years old</span>
                <span className="ml-auto font-medium">33%</span>
              </div>
              <div className="flex items-center mt-4">
                <div className="w-2 h-2 mr-3 rounded-full bg-warning"></div>
                <span className="truncate">&gt;= 50 Years old</span>
                <span className="ml-auto font-medium">10%</span>
              </div>
            </div>
          </div>
        </div>
        {/* END: Sales Report */}
        {/* BEGIN: Official Store */}
        <div className="col-span-12 mt-6 xl:col-span-8">
          <div className="items-center block h-10 intro-y sm:flex">
            <h2 className="mr-5 text-lg font-medium truncate">Official Store</h2>
            <div className="relative mt-3 sm:ml-auto sm:mt-0 text-slate-500">
              <Lucide
                icon="MapPin"
                className="absolute inset-y-0 left-0 z-10 w-4 h-4 my-auto ml-3"
              />
              <input
                type="text"
                className="pl-10 form-control sm:w-56 box"
                placeholder="Filter by city"
              />
            </div>
          </div>
          <div className="p-5 mt-12 intro-y box sm:mt-5">
            <div>
              250 Official stores in 21 countries, click the marker to see location details.
            </div>
            <ReportMap className="mt-5 rounded-md report-maps bg-slate-200" />
          </div>
        </div>
        {/* END: Official Store */}
        {/* BEGIN: Weekly Best Sellers */}
        <div className="col-span-12 mt-6 xl:col-span-4">
          <div className="flex items-center h-10 intro-y">
            <h2 className="mr-5 text-lg font-medium truncate">Weekly Best Sellers</h2>
          </div>
          <div className="mt-5">
            {$_.take($f(), 4).map((faker, fakerKey) => (
              <div key={fakerKey} className="intro-y">
                <div className="flex items-center px-4 py-4 mb-3 box zoom-in">
                  <div className="flex-none w-10 h-10 overflow-hidden rounded-md image-fit">
                    <img alt="Midone Tailwind HTML Admin Template" src={faker.photos[0]} />
                  </div>
                  <div className="ml-4 mr-auto">
                    <div className="font-medium">{faker.users[0].name}</div>
                    <div className="text-slate-500 text-xs mt-0.5">{faker.dates[0]}</div>
                  </div>
                  <div className="px-2 py-1 text-xs font-medium text-white rounded-full cursor-pointer bg-success">
                    137 Sales
                  </div>
                </div>
              </div>
            ))}
            <a
              href=""
              className="block w-full py-4 text-center border border-dotted rounded-md intro-y border-slate-400 dark:border-darkmode-300 text-slate-500">
              View More
            </a>
          </div>
        </div>
        {/* END: Weekly Best Sellers */}
        {/* BEGIN: General Report */}
        <div className="grid grid-cols-12 col-span-12 gap-6 mt-8">
          <div className="col-span-12 sm:col-span-6 2xl:col-span-3 intro-y">
            <div className="p-5 box zoom-in">
              <div className="flex items-center">
                <div className="flex-none w-2/4">
                  <div className="text-lg font-medium truncate">Target Sales</div>
                  <div className="mt-1 text-slate-500">300 Sales</div>
                </div>
                <div className="relative flex-none ml-auto">
                  <ReportDonutChart1 width={90} height={90} />
                  <div className="absolute top-0 left-0 flex items-center justify-center w-full h-full font-medium">
                    20%
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-span-12 sm:col-span-6 2xl:col-span-3 intro-y">
            <div className="p-5 box zoom-in">
              <div className="flex">
                <div className="mr-3 text-lg font-medium truncate">Social Media</div>
                <div className="flex items-center px-2 py-1 ml-auto text-xs truncate rounded-full cursor-pointer bg-slate-100 dark:bg-darkmode-400 text-slate-500">
                  320 Followers
                </div>
              </div>
              <div className="mt-1">
                <SimpleLineChart1 height={58} className="-ml-1" />
              </div>
            </div>
          </div>
          <div className="col-span-12 sm:col-span-6 2xl:col-span-3 intro-y">
            <div className="p-5 box zoom-in">
              <div className="flex items-center">
                <div className="flex-none w-2/4">
                  <div className="text-lg font-medium truncate">New Products</div>
                  <div className="mt-1 text-slate-500">1450 Products</div>
                </div>
                <div className="relative flex-none ml-auto">
                  <ReportDonutChart1 width={90} height={90} />
                  <div className="absolute top-0 left-0 flex items-center justify-center w-full h-full font-medium">
                    45%
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-span-12 sm:col-span-6 2xl:col-span-3 intro-y">
            <div className="p-5 box zoom-in">
              <div className="flex">
                <div className="mr-3 text-lg font-medium truncate">Posted Ads</div>
                <div className="flex items-center px-2 py-1 ml-auto text-xs truncate rounded-full cursor-pointer bg-slate-100 dark:bg-darkmode-400 text-slate-500">
                  180 Campaign
                </div>
              </div>
              <div className="mt-1">
                <SimpleLineChart1 height={58} className="-ml-1" />
              </div>
            </div>
          </div>
        </div>
        {/* END: General Report */}
        {/* BEGIN: Weekly Top Products */}
        <div className="col-span-12 mt-6">
          <div className="items-center block h-10 intro-y sm:flex">
            <h2 className="mr-5 text-lg font-medium truncate">Weekly Top Products</h2>
            <div className="flex items-center mt-3 sm:ml-auto sm:mt-0">
              <button className="flex items-center btn box text-slate-600 dark:text-slate-300">
                <Lucide icon="FileText" className="hidden w-4 h-4 mr-2 sm:block" />
                Export to Excel
              </button>
              <button className="flex items-center ml-3 btn box text-slate-600 dark:text-slate-300">
                <Lucide icon="FileText" className="hidden w-4 h-4 mr-2 sm:block" />
                Export to PDF
              </button>
            </div>
          </div>
          <div className="mt-8 overflow-auto intro-y lg:overflow-visible sm:mt-0">
            <table className="table table-report sm:mt-2">
              <thead>
                <tr>
                  <th className="whitespace-nowrap">IMAGES</th>
                  <th className="whitespace-nowrap">PRODUCT NAME</th>
                  <th className="text-center whitespace-nowrap">STOCK</th>
                  <th className="text-center whitespace-nowrap">STATUS</th>
                  <th className="text-center whitespace-nowrap">ACTIONS</th>
                </tr>
              </thead>
              <tbody>
                {$_.take($f(), 4).map((faker, fakerKey) => (
                  <tr key={fakerKey} className="intro-x">
                    <td className="w-40">
                      <div className="flex">
                        <div className="w-10 h-10 image-fit zoom-in">
                          <Tippy
                            tag="img"
                            alt="Midone Tailwind HTML Admin Template"
                            className="rounded-full"
                            src={faker.images[0]}
                            content={`Uploaded at ${faker.dates[0]}`}
                          />
                        </div>
                        <div className="w-10 h-10 -ml-5 image-fit zoom-in">
                          <Tippy
                            tag="img"
                            alt="Midone Tailwind HTML Admin Template"
                            className="rounded-full"
                            src={faker.images[1]}
                            content={`Uploaded at ${faker.dates[1]}`}
                          />
                        </div>
                        <div className="w-10 h-10 -ml-5 image-fit zoom-in">
                          <Tippy
                            tag="img"
                            alt="Midone Tailwind HTML Admin Template"
                            className="rounded-full"
                            src={faker.images[2]}
                            content={`Uploaded at ${faker.dates[2]}`}
                          />
                        </div>
                      </div>
                    </td>
                    <td>
                      <a href="" className="font-medium whitespace-nowrap">
                        {faker.products[0].name}
                      </a>
                      <div className="text-slate-500 text-xs whitespace-nowrap mt-0.5">
                        {faker.products[0].category}
                      </div>
                    </td>
                    <td className="text-center">{faker.stocks[0]}</td>
                    <td className="w-40">
                      <div
                        className={classnames({
                          'flex items-center justify-center': true,
                          'text-success': faker.trueFalse[0],
                          'text-danger': !faker.trueFalse[0]
                        })}>
                        <Lucide icon="CheckSquare" className="w-4 h-4 mr-2" />
                        {faker.trueFalse[0] ? 'Active' : 'Inactive'}
                      </div>
                    </td>
                    <td className="w-56 table-report__action">
                      <div className="flex items-center justify-center">
                        <a className="flex items-center mr-3" href="">
                          <Lucide icon="CheckSquare" className="w-4 h-4 mr-1" />
                          Edit
                        </a>
                        <a className="flex items-center text-danger" href="">
                          <Lucide icon="Trash2" className="w-4 h-4 mr-1" /> Delete
                        </a>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="flex flex-wrap items-center mt-3 intro-y sm:flex-row sm:flex-nowrap">
            <nav className="w-full sm:w-auto sm:mr-auto">
              <ul className="pagination">
                <li className="page-item">
                  <a className="page-link" href="#">
                    <Lucide icon="ChevronsLeft" className="w-4 h-4" />
                  </a>
                </li>
                <li className="page-item">
                  <a className="page-link" href="#">
                    <Lucide icon="ChevronLeft" className="w-4 h-4" />
                  </a>
                </li>
                <li className="page-item">
                  <a className="page-link" href="#">
                    ...
                  </a>
                </li>
                <li className="page-item">
                  <a className="page-link" href="#">
                    1
                  </a>
                </li>
                <li className="page-item active">
                  <a className="page-link" href="#">
                    2
                  </a>
                </li>
                <li className="page-item">
                  <a className="page-link" href="#">
                    3
                  </a>
                </li>
                <li className="page-item">
                  <a className="page-link" href="#">
                    ...
                  </a>
                </li>
                <li className="page-item">
                  <a className="page-link" href="#">
                    <Lucide icon="ChevronRight" className="w-4 h-4" />
                  </a>
                </li>
                <li className="page-item">
                  <a className="page-link" href="#">
                    <Lucide icon="ChevronsRight" className="w-4 h-4" />
                  </a>
                </li>
              </ul>
            </nav>
            <select className="w-20 mt-3 form-select box sm:mt-0">
              <option>10</option>
              <option>25</option>
              <option>35</option>
              <option>50</option>
            </select>
          </div>
        </div>
        {/* END: Weekly Top Products */}
      </div>
    </div>
    // </div>
  );
}

export default Main;
