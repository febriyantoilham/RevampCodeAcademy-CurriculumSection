"use client";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux"

import CustomAlert from "@/app/ui/alert";
import ProgramForm from "./form/ProgramForm";
import LogoForm from "./form/LogoForm";
import Link from "next/link";
import { DeleteProgramReq, GetCateAndInstructorReq, GetProgramByIdReq, ResetProgram } from "@/redux-saga/action/curriculum/programEntityAction";
import { useRouter } from "next/navigation";
import { hasCookie } from "cookies-next";

export default function Page({ params }: { params: { id: string } }) {
  const dispatch = useDispatch(); // Dispatch
  const [refresh, setRefresh] = useState(true); // Set Refresh
  const router = useRouter(); // Next Navigation Router
  const [alertInfo, setAlertInfo] = useState({ showAlert: false, alertText: '', alertType: '' }); // Alert Config
  const program = useSelector((state: any) => state.programEntityState.program); // Program State (programEntityReducer)
  const cateAndInstructor = useSelector((state: any) => state.programEntityState.cateAndInstructor); // cateAndInstructor State (programEntityReducer)
  const category = cateAndInstructor?.category; // Assign Category Data
  const instructor = cateAndInstructor?.instructor; // Assign Instructor Data

  const [id, setId] = useState(params.id);

  useEffect(() => {
    if (!hasCookie('access_token')) {
      router.push("/signin");
    } else {
      dispatch(GetCateAndInstructorReq()); // Get Category and Instructor
      dispatch(GetProgramByIdReq(id)); // Get Program
      setRefresh(false); // Set False
    }
  }, [dispatch, id, refresh, router])
  
  const onDelete = () => {
    dispatch(DeleteProgramReq(id));
    router.push('/curriculum');
  }

  // if (program !== null) {
  //   console.log(`Program Data: ${JSON.stringify(program)}`);
  //   console.log(`Category Data: ${JSON.stringify(category)}`);
  //   console.log(`Instructor Data: ${JSON.stringify(instructor)}`);
  // }

  return (
    <div className="card bg-base-100 shadow-xl">
      {alertInfo.showAlert && <CustomAlert alertInfo={alertInfo} setAlert={setAlertInfo} setRefresh={setRefresh}/>}
      <div className="card-body">
        <div className='py-2'>
          <div className='flex justify-between items-center gap-4'>
            <div className='text-xl font-medium'>Curriculum Details</div>
            <Link href={'/curriculum'} className="btn btn-ghost btn-md" onClick={() => ResetProgram()}>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" /></svg>
              <span> Back</span>
            </Link>
          </div>
        </div>
        <div className="border-t border-gray-300 my-3"></div>
        { program && category && instructor ?
        <div className="grid xl:grid-cols-5 gap-5">
          <div className="xl:col-span-1 xl:order-last">
            <div className="card w-full bg-base-100 py-5">
              <div className="card-body">
                <LogoForm program={program}/>
              </div>
            </div>
          </div>
          <div className="xl:col-span-4">
            <div className="card w-full bg-base-100">
              <div className="card-body">
                <ProgramForm program={program} option={{ category, instructor }}/>
                <div className="modal-action flex justify-between">
                  <button type='button' className='btn btn-error btn-outline' onClick={() => onDelete()}><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" /></svg><span>Delete</span></button>
                  <div className="flex gap-x-3">
                    <Link href={`/curriculum/${id}`} className='btn btn-primary'>Edit Program</Link>
                    <Link href={'/curriculum'} className="btn btn-neutral">Close</Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        : <div className="w-full flex justify-center"><span className="loading loading-spinner loading-lg"></span></div>
        }
      </div>
    </div>
  )
}
