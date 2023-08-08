"use client"
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { GetCatReq, GetCurriculumReq, SearchCurriculumReq } from '@/redux-saga/action/curriculumAction';
import Link from 'next/link';
import CreatePage from './createPage';
import DeleteModal from './deletePage';
import EditPage from './editPage';
import ViewProgram from './viewProgramPage';
import CustomAlert from "@/ui/alert";
import { useRouter } from 'next/router';

export default function Page() {
  const dispatch = useDispatch();
  const [refresh, setRefresh] = useState(false);
  const [viewProgRefresh, setViewProgRefresh] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [status, setStatus] = useState('');
  const [statusLabel, setStatusLabel] = useState('Pilih Status');
  const [createDisplay, setCreateDisplay] = useState(false);
  const [editDisplay, setEditDisplay] = useState(false);
  const [searchDisplay, setSearchDisplay] = useState(false);
  const [progId, setProgId] = useState('');
  const [dropdownStatusOpen, setDropdownStatusOpen] = useState(false);
  const [alertInfo, setAlertInfo] = useState({ showAlert: false, alertText: '', alertType: '' });

  const { curriculum } = useSelector((state: any) => state.curriculumState);
  const { program } = useSelector((state: any) => state.getOneCurriculumState);

  const { category, instructor } = useSelector((state: any) => state.categoryCurriculumState);

  useEffect(() => {
    dispatch(SearchCurriculumReq({}));
    dispatch(GetCatReq({}));
    // setRefresh(false);
  }, [dispatch, refresh]);

  const onSearch = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const payload = {
      name: searchValue,
      status: status,
    };
    dispatch(SearchCurriculumReq(payload));
    setSearchDisplay(true);
  };

  let pageNumber: any[] = [];
  let totalPage: number = Math.ceil(curriculum?.totalCount / curriculum?.limit);
  let currentPage: number = curriculum?.page;

  for (let i: number = currentPage - 3; i <= currentPage + 3; i++) {
    if (i < 1) continue;
    if (i > totalPage) break;
    pageNumber.push(i);
  }

  const handleRefresh = () => {
    setSearchValue('');
    setStatus('');
    setStatusLabel('Pilih Status');
    setRefresh(true);
  };

  const onClick = (page: number) => {
    const payload = {
      page: page,
      name: searchValue,
      status: status,
    };
    if (searchDisplay) {
      dispatch(SearchCurriculumReq(payload));
    } else {
      dispatch(GetCurriculumReq(payload));
    }
  };

  return (
    <div className='py-10 px-10 bg-base-100'>
      <>
        {createDisplay ? (
          <CreatePage setDisplay={setCreateDisplay} setRefresh={setRefresh} category={category} instructor={instructor} setAlertInfo={setAlertInfo}/>
        ) : editDisplay ? (
          <ViewProgram setDisplay={setEditDisplay} setRefresh={setRefresh} progId={progId} setAlertInfo={setAlertInfo} handleRefresh={handleRefresh}/>
        ) : (
          <>
            <div className=''>
              <div className='py-2'>
                {alertInfo.showAlert && <CustomAlert alertInfo={alertInfo} setAlert={setAlertInfo}/>}
                <div className='grid grid-cols-2 gap-4'>
                  <div className='flex justify-start font-extrabold uppercase text-xl my-auto text-gray-950'>Curriculum</div>
                  <div className='flex justify-end'>
                    <button className='btn btn-primary my-auto ' onClick={() => setCreateDisplay(true)}>
                      Create Curriculum
                    </button>
                  </div>
                </div>
              </div>

              <div className='py-5'>
                <div className='grid grid-cols-6'>
                  <div className='col-start-2 col-span-4'>
                    <form onSubmit={onSearch} className='w-full flex justify-center'>
                      <label htmlFor='searchInput' className='my-auto mr-5 font-medium capitalize'>
                        Search by Category
                      </label>
                      <input
                        type='text'
                        id='searchInput'
                        placeholder='Type here'
                        className='input input-bordered w-full max-w-xs mr-5 my-auto'
                        value={searchValue}
                        onChange={(e) => setSearchValue(e.target.value)}
                      />
                      <div className='dropdown my-auto mr-5'>
                        <label tabIndex={0} className='btn btn-outline m-1' onClick={() => setDropdownStatusOpen(!dropdownStatusOpen)}>
                          {statusLabel}
                        </label>
                        {dropdownStatusOpen && (
                          <ul tabIndex={0} className='dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52'>
                            <li>
                              <button type='button' onClick={() => { setStatus(''); setStatusLabel('Semua'); }}>
                                Semua
                              </button>
                            </li>
                            <li>
                              <button type='button' onClick={() => { setStatus('online'); setStatusLabel('Online'); }}>
                                Online
                              </button>
                            </li>
                            <li>
                              <button type='button' onClick={() => { setStatus('offline'); setStatusLabel('Offline'); }}>
                                Offline
                              </button>
                            </li>
                          </ul>
                        )}
                      </div>
                      <button type='submit' className='btn my-auto'>
                        Search
                      </button>
                    </form>
                  </div>
                  <div className='col-span-1 flex justify-end'>
                    <button className='btn btn-neutral' onClick={handleRefresh}>
                      <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth={1.5} stroke='currentColor' className='w-6 h-6'>
                        <path strokeLinecap='round' strokeLinejoin='round' d='M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99' />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>

              <div className='overflow-x-auto'>
                <table className='table'>
                  <thead>
                    <tr>
                      <th>
                        <label>
                          <input type="checkbox" className="checkbox" />
                        </label>
                      </th>
                      <th>#</th>
                      <th>NAME</th>
                      <th>TITLE</th>
                      <th>DURATION</th>
                      <th>TOTAL</th>
                      <th>TYPE</th>
                      <th>RATING</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {curriculum.data && curriculum.data.map((program: any, index: number) => (
                      <tr key={program.progEntityId}>
                        <td>
                          <label>
                            <input type="checkbox" className="checkbox" />
                          </label>
                        </td>
                        <td className='capitalize text-center'>{program.progEntityId}</td>
                        <td className='capitalize'>{program.progTitle}</td>
                        <td className='capitalize'>{program.progHeadline}</td>
                        <td className='capitalize text-center'>
                          {program.progDuration === '' || program.progDuration === null ? (<>-</>):(`${program.progDuration} ${program.progDurationType}`)}
                        </td>
                        <td className='text-center'>{program.progTotalTrainee === '' || program.progTotalTrainee === null ? (<>-</>):(`${program.progTotalTrainee}`)}</td>
                        <td className='capitalize'>{program.progLearningType}</td>
                        <td className='text-center'>{program.progRating === '' || program.progRating === null ? (<>-</>):(`${program.progRating}`)}</td>
                        <td className=''>
                          <button className="btn btn-active btn-sm" onClick={() => {setEditDisplay(true); setProgId(program.progEntityId)}}>
                            See Details
                          </button>
                          {/* <DeleteModal program={program} setRefresh={setRefresh}/> */}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className='join flex justify-center py-5'>
                {pageNumber.map((page, index) => (
                  <Link
                    key={index}
                    className={page === currentPage ? 'join-item btn btn-active' : 'join-item btn'}
                    href={`/curriculum`}
                    onClick={() => onClick(page)}
                  >
                    {page}
                  </Link>
                ))}
              </div>
            </div>
          </>
        )}
      </>
    </div>
  );
}
