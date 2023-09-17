"use client";

import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";
import { useEffect, useState } from "react";
import { GetCateAndInstructorReq, CreateProgEntityIdReq, GetProgramByIdReq, ResetProgram } from "@/redux-saga/action/curriculum/programEntityAction";
import Form from "./form";
import CustomAlert from "@/app/ui/alert";
import { hasCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import { GetAllSectionRequest } from "@/redux-saga/action/curriculum/sectionAction";
import { ResetSectionDetailState } from "@/redux-saga/action/curriculum/sectionDetailAction";

export default function Page() {
  const dispatch = useDispatch(); // Dispatch
  const route = useRouter(); // Next Navigation
  const [refresh, setRefresh] = useState(false); // Set Refresh
  const [alertInfo, setAlertInfo] = useState({ showAlert: false, alertText: '', alertType: '' }); // Alert Modal Setup For Alert Modal
  const cateAndInstructor = useSelector((state: any) => state.programEntityState.cateAndInstructor); // cateAndInstructor State (programEntityReducer)
  const category = cateAndInstructor?.category; // Assign Category Data
  const instructor = cateAndInstructor?.instructor; // Assign Instructor Data
  const progEntityId = useSelector((state: any) => state.programEntityState.progEntityId); // progEntityId State (programEntityReducer)
  // const progEntityId = 4; // progEntityId State (programEntityReducer)
  const responseProgram = useSelector((state: any) => state.programEntityState.response); // response State (sectionDetailsReducer)
  const responseSection = useSelector((state: any) => state.sectionState.response); // response State (sectionDetailsReducer)
  const responseSectionDetail = useSelector((state: any) => state.sectionDetailReducer.response); // response State (sectionDetailsReducer)
  const program = useSelector((state: any) => state.programEntityState.program); // program State (programEntityReducer)
  const user = useSelector((state: any) => state.usersState.currentUser); // Current User State (UsersReducer)
  const [onEdit, setOnEdit] = useState(false); // UseState for onEdit status
  
  useEffect(() => {
    // Check The User Already Login Or Not
    if (!hasCookie('access_token')) {
      route.push("/signin");
    } else {
      // Check user for make sure the user is already loaded before anything else
      if (user !== null) {
        // Check the progEntityId, if null call CreateProgEntityId
        if(progEntityId === null){
          dispatch(CreateProgEntityIdReq()); // Create New Program Entity Id
        }
        if (progEntityId !== null) {
          dispatch(GetCateAndInstructorReq()); // Get Category and Instructor
          // Check are the page is onEdit or not
          if(onEdit === true) {
            dispatch(GetProgramByIdReq(progEntityId)) // Get Program By Id
            dispatch(GetAllSectionRequest(progEntityId)); // Get Sections Data
            dispatch(ResetSectionDetailState()); // Reset Sections Detail State
          }
        }
      }
      if (responseProgram === true || responseSection === true || responseSectionDetail === true) {setRefresh(true)};
      setRefresh(false);
    }
  }, [dispatch, onEdit, progEntityId, refresh, responseProgram, responseSection, responseSectionDetail, route, user])

  // if (onEdit === true) {
  //   if (progEntityId !== null && cateAndInstructor !== null && program !== null) {
  //     console.log(`progEntityId: ${progEntityId}`);
  //     console.log(`category: ${JSON.stringify(category)}`);
  //     console.log(`instructor: ${JSON.stringify(instructor)}`);
  //     console.log(`program: ${JSON.stringify(program)}`);
  //   }
  // } else {
  //   if (progEntityId !== null && cateAndInstructor !== null) {
  //     console.log(`progEntityId: ${progEntityId}`);
  //     console.log(`category: ${JSON.stringify(category)}`);
  //     console.log(`instructor: ${JSON.stringify(instructor)}`);
  //   }
  // }

  return (
    <div className='card bg-base-100 shadow-xl'>
      <div className="card-body">
        {alertInfo.showAlert && <CustomAlert alertInfo={alertInfo} setAlert={setAlertInfo} setRefresh={setRefresh}  refresh={refresh}/>}
        <div className='py-2'>
          <div className='flex justify-between items-center gap-4'>
            <div className='text-xl font-medium'>Create Curriculum</div>
            <Link href={'/curriculum'} className="btn btn-ghost btn-md" onClick={() => ResetProgram()}>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" /></svg>
              <span> Back</span>
            </Link>
          </div>
        </div>
        <div className="border-t border-gray-300 my-3"></div>
        {/* form */}
        <div>
          {((onEdit && program) || (!onEdit && progEntityId)) && category && instructor && (
            <Form program={program} option={{ category, instructor }} progEntityId={progEntityId} onEdit={onEdit} setOnEdit={setOnEdit} setRefresh={setRefresh} alert={setAlertInfo}/>
          )}
        </div>
      </div>
    </div>
  )
}
