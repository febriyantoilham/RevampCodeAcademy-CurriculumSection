"use client";

import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";
import { useEffect, useState } from "react";
import { GetCateAndInstructorReq, GetProgramByIdReq } from "@/redux-saga/action/curriculum/programEntityAction";
import Form from "./form";
import { hasCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import { GetAllSectionRequest } from "@/redux-saga/action/curriculum/sectionAction";
import { ResetSectionDetailState } from "@/redux-saga/action/curriculum/sectionDetailAction";

export default function Page({ params }: { params: { id: string } }) {
  const dispatch = useDispatch(); // Dispatch
  const route = useRouter(); // Next Navigation
  const [refresh, setRefresh] = useState(false); // Set Refresh
  const program = useSelector((state: any) => state.programEntityState.program); // Program State (programEntityReducer)
  const cateAndInstructor = useSelector((state: any) => state.programEntityState.cateAndInstructor); // cateAndInstructor State (programEntityReducer)
  const category = cateAndInstructor?.category; // Assign Category Data
  const instructor = cateAndInstructor?.instructor; // Assign Instructor Data
  const responseProgram = useSelector((state: any) => state.programEntityState.response); // response State (sectionDetailsReducer)
  const responseSection = useSelector((state: any) => state.sectionState.response); // response State (sectionDetailsReducer)
  const responseSectionDetail = useSelector((state: any) => state.sectionDetailReducer.response); // response State (sectionDetailsReducer)
  const user = useSelector((state: any) => state.usersState.currentUser); // Current User State (UsersReducer)
  const [id, setId] = useState(params.id);
  
  useEffect(() => {
    // Check The User Already Login Or Not
    if (!hasCookie('access_token')) {
      route.push("/signin");
    } else {
      // Check user for make sure the user is already loaded before anything else
      if (user !== null) {
        if (id !== null) {
          dispatch(GetCateAndInstructorReq()); // Get Category and Instructor
          dispatch(GetProgramByIdReq(id)) // Get Program By Id
          dispatch(GetAllSectionRequest(id)); // Get Sections Data
          dispatch(ResetSectionDetailState()); // Reset Sections Detail State
        }
      }
      if (responseProgram === true || responseSection === true || responseSectionDetail === true) {setRefresh(true)};
      setRefresh(false);
    }
  }, [dispatch, id, refresh, responseProgram, responseSection, responseSectionDetail, route, user])

  return (
    <div className='card bg-base-100 shadow-xl'>
      <div className="card-body">
        <div className='py-2'>
          <div className='flex justify-between items-center gap-4'>
            <div className='text-xl font-medium'>Edit Curriculum</div>
            <Link href={'/curriculum'} className="btn btn-ghost btn-md">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" /></svg>
              <span> Back</span>
            </Link>
          </div>
        </div>
        <div className="border-t border-gray-300 my-3"></div>
        {/* form */}
        <div>
          {program && category && instructor && 
            <Form program={program} option={{ category, instructor }} setRefresh={setRefresh}/>
          }
        </div>
      </div>
    </div>
  )
}
