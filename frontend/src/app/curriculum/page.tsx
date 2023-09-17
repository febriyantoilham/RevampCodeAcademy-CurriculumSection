"use client"
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Link from 'next/link';
import CustomAlert from "@/app/ui/alert";
import { hasCookie } from 'cookies-next';
import { useRouter } from 'next/navigation';
import { BulkDeleteProgramReq, DeleteProgramReq, GetCateAndInstructorReq, GetProgramReq } from '@/redux-saga/action/curriculum/programEntityAction';

export default function Page() {
  const dispatch = useDispatch(); // Dispatch
  const route = useRouter(); // Next Navigation
  const [refresh, setRefresh] = useState(true); // Set Refresh
  const [page, setPage] = useState(1); // Current Page
  const [limit, setLimit] = useState(10); // Limit Value Per Page
  const [searchValue, setSearchValue] = useState(''); // Value Of Search Input
  const [status, setStatus] = useState(''); // Value Of Status Select
  const [alertInfo, setAlertInfo] = useState({ showAlert: false, alertText: '', alertType: '' }); // Alert Modal Setup For Alert Modal
  const program = useSelector((state: any) => state.programEntityState.programList); // Program List State (ProgramEntityReducer)
  const response = useSelector((state: any) => state.programEntityState.response); // Response State (ProgramEntityReducer)
  const [selectedItem, setSelectedItem] = useState<any[]>([]); // Select Item Setup For The Checkbox In Table
  const [selectAll, setSelectedAll] = useState(false); // Select All Item Setup For The Checkbox In Table
  const user = useSelector((state: any) => state.usersState.currentUser); // Current User State (UsersReducer)

  useEffect(() => {
    // Check The User Already Login Or Not
    if (!hasCookie('access_token')) {
      route.push("/signin");
    } else {
      if (user !== null) {
        const payload = { page: page, limit: limit, searchValue: searchValue, status: status } // Set payload for getProgramReq
        dispatch(GetProgramReq(payload)); // Get Programs
        dispatch(GetCateAndInstructorReq()); // Get the category and the instuctor for option in form
      }
      if (response === true) {setRefresh(true)};
      setRefresh(false);
    }
  }, [dispatch, limit, page, refresh, response, route, searchValue, status, user]);

  // Setup for pagination
  let pageNumberStart: any[] = [];
  let pageNumberEnd: any[] = [];
  let totalPage: number = Math.ceil(program?.totalCount / program?.limit);
  let currentPage: number = parseInt(program?.page);

  // Calculate the page numbers based on the current page
  if (totalPage >= 1) {
    // Ensure currentPage is within the valid range
    const minPage = Math.max(1, currentPage - 1);
    const maxPage = Math.min(currentPage + 1, totalPage);

    // Push the calculated page numbers into pageNumberStart
    for (let i = minPage; i <= maxPage; i++) {
      pageNumberStart.push(i);
    }

    // Push the last page into pageNumberEnd
    pageNumberEnd.push(totalPage);
  }

  // if (program) {
  //   console.log(`pageNumberStart = ${pageNumberStart}`);
  //   console.log(`pageNumberEnd = ${pageNumberEnd}`);
  //   console.log(`totalPage = ${totalPage}`);
  //   console.log(`currentPage = ${currentPage}`);
  // }
  // console.log(`Refresh = ${refresh ? 'true' : 'false'}`);
  // console.log(`Program = ${JSON.stringify(program)}`);
  // console.log(`Response = ${response ? 'true' : 'false'}`);

  // Setup for refresh button
  const handleRefresh = () => {
    setSearchValue('');
    setStatus('');
    setSelectedItem([]);
    setSelectedAll(false);
    setRefresh(true);
  };

  // Setup for checkbox in table
  const handleSelectedItem = (progEntityId: any) => {
    if (selectedItem.includes(progEntityId)) {
      setSelectedItem(selectedItem.filter(id => id !== progEntityId));
      setSelectedAll(false);
    } else {
      setSelectedItem([...selectedItem, progEntityId]);
    }
  };

  // Setup for select all checkbox in table
  const handleSelectAll = () => {
    if (selectAll){
      setSelectedItem([]);
    } else {
      const allItems = program.data.map((item:any) => item.progEntityId);
      setSelectedItem(allItems);
    }
    setSelectedAll(!selectAll);
  }

  // Setup for bulk delete
  const onBulDelete = async () => {
    try {
      dispatch(BulkDeleteProgramReq(selectedItem));
      setSelectedItem([]);
      setSelectedAll(false);
      setRefresh(true);
    } catch (error) {
      console.error('Error deleting bundle:', error);
    }
  }

  // Check cookie, for make sure the content get loaded after the user login
  if (!hasCookie('access_token')) {
      route.push("/signin");
    } else {
      return (
        <div className='card bg-base-100 shadow-xl'>
          <div className='card-body'>
            {/* Page Title and Create Button */}
            <div className='py-2'>
              {alertInfo.showAlert && <CustomAlert alertInfo={alertInfo} setAlert={setAlertInfo} setRefresh={setRefresh}/>}
              <div className='grid grid-cols-2 gap-4'>
                <div className='text-xl font-medium'>Curriculum</div>
                {/* <div className='flex justify-end'>
                  <button className='btn btn-neutral btn-square' onClick={handleRefresh}>
                    <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth={1.5} stroke='currentColor' className='w-5 h-5'>
                      <path strokeLinecap='round' strokeLinejoin='round' d='M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99' />
                    </svg>
                  </button>
                </div> */}
              </div>
            </div>
            {/* Bulk Delete Button, Search Program, and Refresh Button */}
            <div className='py-5 flex flex-col gap-3'>
                <div className='flex justify-center items-center gap-5'>
                  <label htmlFor='searchInput' className='text-sm font-medium'>
                    Search by Category
                  </label>
                  <input type='text' id='searchInput' placeholder='Search...' className='input input-bordered input-md w-full max-w-xs text-sm' value={searchValue} onChange={(e) => {setSearchValue(e.target.value); setPage(1); setRefresh(true);}}/>
                  <div className='dropdown dropdown-hover dropdown-bottom dropdown-end'>
                    <label tabIndex={0} className='btn btn-outline m-1'>{status || 'Program Type'}</label>
                      <ul tabIndex={0} className='dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52'>
                        <li>
                          <button type='button' onClick={() => { setStatus(''); setRefresh(true)}}>
                            Semua
                          </button>
                        </li>
                        <li>
                          <button type='button' onClick={() => { setStatus('online'); setRefresh(true) }}>
                            Online
                          </button>
                        </li>
                        <li>
                          <button type='button' onClick={() => { setStatus('offline'); setRefresh(true) }}>
                            Offline
                          </button>
                        </li>
                      </ul>
                  </div>
                </div>
                <div className='flex justify-between'>
                  <button className={`btn btn-sm btn-outline btn-error ${selectedItem.length !== 0 ? 'visible' : 'invisible'}`} onClick={onBulDelete}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                    </svg>
                    <span>Delete</span>
                  </button>
                  <Link href={'/curriculum/create'} className='btn btn-sm'>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                    <span>Create Program</span>
                  </Link>
                </div>
            </div>
            {/* Program Tables */}
            <table className='table'>
              <thead>
                <tr>
                  <th>
                    <label>
                      <input type="checkbox" onChange={handleSelectAll} checked={selectAll} className="checkbox" />
                    </label>
                  </th>
                  <th className=''>ID</th>
                  <th className=''>PROGRAM</th>
                  <th className='text-center max-md:hidden'>DURATION</th>
                  <th className='text-center max-md:hidden'>TOTAL</th>
                  <th className='max-md:hidden'>TYPE</th>
                  <th className='text-center max-md:hidden'>RATING</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {program && program.data.map((program: any, index: number) => (
                  <tr key={program.progEntityId} className='hover'>
                    <td>
                      <label>
                        <input type="checkbox" onChange={() => handleSelectedItem(program.progEntityId)} checked={selectedItem.includes(program.progEntityId)} className="checkbox" />
                      </label>
                    </td>
                    <td className=''>
                      <div className='font-medium'>{program.progEntityId}</div>
                    </td>
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
                    <td>
                      <div className="dropdown dropdown-left dropdown-hover">
                        <label tabIndex={0} className="btn btn-md btn-square btn-ghost">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M12 6.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 12.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 18.75a.75.75 0 110-1.5.75.75 0 010 1.5z" /></svg>
                        </label>
                        <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
                          <li><Link href={`/curriculum/view/${program.progEntityId}`}>View</Link></li>
                          <li><Link href={`/curriculum/edit/${program.progEntityId}`}>Edit</Link></li>
                          <li><button onClick={() => {dispatch(DeleteProgramReq(program.progEntityId)); setRefresh(true);}}>Delete</button></li>
                        </ul>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {/* Pagination */}
            <div className='join flex justify-center py-5'>
              <div className="join">
                { currentPage > 1 && (<button className="join-item btn" type='button' onClick={() => setPage(1)}>First Page</button>)
                }
                {pageNumberStart.map((page, index) => (
                  <button key={index} className={`join-item btn ${currentPage === page && 'btn-active'}`} type='button' onClick={() => setPage(page)}>{page}</button>
                ))}
                {currentPage < totalPage - 1 && (<button className="join-item btn btn-disabled">...</button>)}
                {currentPage < totalPage - 1 && pageNumberEnd.map((page, index) => (
                  <button key={index} className="join-item btn" type='button' onClick={() => setPage(page)}>{page}</button>
                ))}
              </div>
            </div>
          </div>
        </div>
      );
    }
}
