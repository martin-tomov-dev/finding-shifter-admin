import React from 'react';
import { Lucide } from '@/base-components';

function Main({ current, setCurrent, setLimit, total }) {
  return (
    <div className="flex flex-wrap items-center col-span-12 intro-y sm:flex-row sm:flex-nowrap">
      <nav className="w-full sm:w-auto sm:mr-auto">
        <ul className="pagination">
          <li className="page-item">
            <a className="page-link" onClick={() => setCurrent(1)}>
              <Lucide icon="ChevronsLeft" className="w-4 h-4" />
            </a>
          </li>
          <li className="page-item">
            <button
              className="page-link"
              disabled={current < 2}
              onClick={() => {
                if (current - 1 >= 1) {
                  setCurrent((prev) => prev - 1);
                }
              }}>
              <Lucide icon="ChevronLeft" className="w-4 h-4" />
            </button>
          </li>
          {current > 1 && (
            <>
              <li className="page-item">
                <button className="page-link">...</button>
              </li>
              <li className="page-item" onClick={() => setCurrent((prev) => prev - 1)}>
                <button className="page-link">{current - 1}</button>
              </li>
            </>
          )}
          <li className="page-item active">
            <button className="page-link" onClick={() => setCurrent((prev) => prev)}>
              {current}
            </button>
          </li>
          {current < total && (
            <>
              <li className="page-item">
                <button className="page-link" onClick={() => setCurrent((prev) => prev + 1)}>
                  {current + 1}
                </button>
              </li>
              <li className="page-item">
                <button className="page-link">...</button>
              </li>
            </>
          )}
          <li className="page-item">
            <button
              className="page-link"
              disabled={current + 1 > total}
              onClick={() => {
                if (current + 1 < total) setCurrent((prev) => prev + 1);
              }}>
              <Lucide icon="ChevronRight" className="w-4 h-4" />
            </button>
          </li>
          <li className="page-item">
            <button className="page-link" onClick={() => setCurrent(total)} disabled={total === 0}>
              <Lucide icon="ChevronsRight" className="w-4 h-4" />
            </button>
          </li>
        </ul>
      </nav>
      <select
        className="w-20 mt-3 form-select box sm:mt-0"
        onClick={(e) => setLimit(e?.target?.value)}>
        <option>12</option>
        <option>24</option>
        <option>36</option>
        <option>48</option>
      </select>
    </div>
  );
}

export default Main;
