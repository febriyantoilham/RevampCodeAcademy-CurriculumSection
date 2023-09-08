"use client"
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { DeleteBundleCurriculumReq, GetCatReq, GetCurriculumReq, GetNewIdReq, ResetCurriculumState, SearchCurriculumReq } from '@/redux-saga/action/curriculumAction';
import Link from 'next/link';
import ViewProgram from './viewPage/ViewProgram';
import CustomAlert from "@/app/ui/alert";
import { ResetSectionState } from '@/redux-saga/action/sectionAction';
import { hasCookie } from 'cookies-next';
import { useRouter } from 'next/navigation';

export default function Page() {
  // Dispatch
  const dispatch = useDispatch();

  // Route
  const route = useRouter();

  // Set Refresh
  const [refresh, setRefresh] = useState(true);
  
  // Search Config
  const [searchValue, setSearchValue] = useState('');
  const [status, setStatus] = useState('');
  const [statusLabel, setStatusLabel] = useState('Pilih Status');
  const [dropdownStatusOpen, setDropdownStatusOpen] = useState(false);
  
  // Display Create
  const [createDisplay, setCreateDisplay] = useState(false);

  // Display Edit
  const [viewDisplay, setViewDisplay] = useState(false);
  const [progId, setProgId] = useState('');

  // Display Search
  const [searchDisplay, setSearchDisplay] = useState(false);

  // Alert Config
  const [alertInfo, setAlertInfo] = useState({ showAlert: false, alertText: '', alertType: '' });

  // Data State
  const { curriculum } = useSelector((state: any) => state.curriculumState);
  const { category, instructor } = useSelector((state: any) => state.categoryCurriculumState);

  // Select Program
  const [selectedItem, setSelectedItem] = useState<any[]>([]);
  const [selectAll, setSelectedAll] = useState(false);

  // User
  const user = useSelector((state: any) => state.authState.currentUser);

  useEffect(() => {
    if (!hasCookie('access_token')) {
      route.push("/signin");
    } else {
      dispatch(ResetCurriculumState());
      // dispatch(ResetSectionState());
      dispatch(SearchCurriculumReq({}));
      dispatch(GetCatReq({}));
    }
    setRefresh(false);
  }, [dispatch, refresh, route, user]);

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
    setSelectedItem([]);
    setSelectedAll(false);
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

  const handleSelectedItem = (progEntityId: any) => {
    if (selectedItem.includes(progEntityId)) {
      setSelectedItem(selectedItem.filter(id => id !== progEntityId));
      setSelectedAll(false);
    } else {
      setSelectedItem([...selectedItem, progEntityId]);
    }
  };

  const handleSelectAll = () => {
    if (selectAll){
      setSelectedItem([]);
    } else {
      const allItems = curriculum.data.map((program:any) => program.progEntityId);
      setSelectedItem(allItems);
    }
    setSelectedAll(!selectAll);
  }

  const onDeleteBundle = async () => {
    try {
      dispatch(DeleteBundleCurriculumReq(selectedItem));
      setSelectedItem([]);
      setSelectedAll(false);
      setAlertInfo({ showAlert: true, alertText: 'Deleting Data Success!', alertType: 'success'});
    } catch (error) {
      console.error('Error deleting bundle:', error);
    }
  }

  if (!hasCookie('access_token')) {
      route.push("/signin");
    } else {
      return (
        <div className='card bg-base-100 shadow-xl'>
          <>
            {viewDisplay ? ( !refresh &&
              <ViewProgram setDisplay={setViewDisplay} setAlertInfo={setAlertInfo} handleRefresh={handleRefresh} progEntityId={progId}/>
            ) : (
              <>
                <div className='card-body'>
                  <div className='py-2'>
                    {alertInfo.showAlert && <CustomAlert alertInfo={alertInfo} setAlert={setAlertInfo} setRefresh={setRefresh}/>}
                    <div className='grid grid-cols-2 gap-4'>
                      <div className='flex justify-start text-xl font-bold'>Curriculum</div>
                      <div className='flex justify-end'>
                        {/* <button className='btn btn-primary my-auto ' onClick={() => setCreateDisplay(true)}>
                          Create Curriculum
                        </button> */}
                        <Link href={'/curriculum/create'} className='btn btn-primary my-auto'>Create New Program</Link>
                      </div>
                    </div>
                  </div>

                  <div className='py-5'>
                    <div className='grid md:grid-cols-6'>
                      {selectedItem.length !== 0 ? 
                      (<>
                        <div className='md:col-span-1 flex justify-start'>
                          <button className='btn btn-error btn-outline' onClick={onDeleteBundle}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                            </svg>
                            <span>Delete</span>
                          </button>
                        </div>
                      </>):(<></>)}
                      <div className='md:col-start-2 md:col-span-4'>
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
                      <div className='md:col-span-1 flex justify-end items-center'>
                        <button className='btn btn-neutral' onClick={handleRefresh}>
                          <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth={1.5} stroke='currentColor' className='w-6 h-6'>
                            <path strokeLinecap='round' strokeLinejoin='round' d='M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99' />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className='overflow-x-auto'>
                    <table className='table table-md'>
                      <thead>
                        <tr>
                          <th>
                            <label>
                              <input type="checkbox" onChange={handleSelectAll} checked={selectAll} className="checkbox" />
                            </label>
                          </th>
                          <th className='text-center max-md:hidden'>#</th>
                          <th className=''>PROGRAM</th>
                          <th className='text-center max-md:hidden'>DURATION</th>
                          <th className='text-center max-md:hidden'>TOTAL</th>
                          <th className='max-md:hidden'>TYPE</th>
                          <th className='text-center max-md:hidden'>RATING</th>
                          <th></th>
                        </tr>
                      </thead>
                      <tbody>
                        {curriculum.data && curriculum.data.map((program: any, index: number) => (
                          <tr key={program.progEntityId}>
                            <td>
                              <label>
                                <input type="checkbox" onChange={() => handleSelectedItem(program.progEntityId)} checked={selectedItem.includes(program.progEntityId)} className="checkbox" />
                              </label>
                            </td>
                            <td className='capitalize text-center max-md:hidden'>{program.progEntityId}</td>
                            <td className='capitalize'>
                              <div className='flex flex-col'>
                                <div className='font-medium'>{program.progTitle}</div>
                                <div className='text-gray-500'>{program.progHeadline}</div>
                              </div>
                            </td>
                            <td className='capitalize text-center max-md:hidden'>
                              {program.progDuration === '' || program.progDuration === null ? (<>-</>):(`${program.progDuration} ${program.progDurationType}`)}
                            </td>
                            <td className='text-center max-md:hidden'>{program.progTotalTrainee === '' || program.progTotalTrainee === null ? (<>-</>):(`${program.progTotalTrainee}`)}</td>
                            <td className='capitalize max-md:hidden'>{program.progLearningType}</td>
                            <td className='text-center max-md:hidden'>{program.progRating === '' || program.progRating === null ? (<>-</>):(`${program.progRating}`)}</td>
                            <td className=''>
                              <button className="btn btn-ghost btn-sm" onClick={() => {setViewDisplay(true); setProgId(program.progEntityId)}}>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" /></svg>
                              </button>
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
}
