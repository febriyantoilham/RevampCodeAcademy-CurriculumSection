"use client";
import { getUserByIdRequest } from "@/redux-saga/action/users/usersAction";
import { getCookie } from "cookies-next";
import Link from "next/link"
import { usePathname } from 'next/navigation';
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function Sidebar(props: any) {
  const [refresh, setRefresh] = useState(false);
  const dispatch = useDispatch();
  const pathname = usePathname();
  const id = getCookie('userEntityId');
  const excludeRoutes = ['/', '/signin', '/signup', '/employee', '/signup/confirm', '/employee/confirm', `/profile/${id}`, '/programs'];
  const show = !excludeRoutes.includes(pathname);
  const user = useSelector((state: any) => state.usersState.currentUser);

  // useEffect(() => {
  //       dispatch(getUserByIdRequest(id));
  //       setRefresh(false);
  //   }, [dispatch, id, refresh])

  return (
    (id && user && show && 
      <div className="drawer lg:drawer-open z-10 min-h-full">
        <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
        <div className="drawer-side overflow-visible">
          <label htmlFor="my-drawer-2" className="drawer-overlay"></label> 
          <div className="card card-compact menu w-80 h-full text-base-content bg-base-100 shadow-xl">
            <div className="card-body">
              <ul className="flex flex-col gap-y-3">
                {/* Sidebar content here */}
                <li><Link href={'/dashboard'} className="btn btn-outline bg-base-300 flex flex-col" style={{ border: 'none' }}>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 25 25" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
                  </svg>
                  <span>Dashboard</span></Link>
                </li>
                <li><Link href={'/curriculum'} className="btn btn-outline bg-base-100 flex flex-col" style={{ border: 'none' }}>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
                  </svg>
                  <span>Curriculum</span></Link>
                </li>
                <li><Link href={'/bootcamp/batch'} className="btn btn-outline bg-base-100 flex flex-col" style={{ border: 'none' }}>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M11.35 3.836c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m8.9-4.414c.376.023.75.05 1.124.08 1.131.094 1.976 1.057 1.976 2.192V16.5A2.25 2.25 0 0118 18.75h-2.25m-7.5-10.5H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V18.75m-7.5-10.5h6.375c.621 0 1.125.504 1.125 1.125v9.375m-8.25-3l1.5 1.5 3-3.75" /></svg>
                  <span>Batch</span></Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    )
)
}
